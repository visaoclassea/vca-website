// /api/create-pix.js
import https from 'https';
import { v4 as uuidv4 } from 'uuid';
import { google } from 'googleapis';

// Certificados base64 (Gerencianet)
const cert = Buffer.from(process.env.GN_CERT_PEM_BASE64, 'base64').toString('utf8');
const key = Buffer.from(process.env.GN_CERT_KEY_BASE64, 'base64').toString('utf8');
const agent = new https.Agent({ cert, key });

// Google Sheets
const serviceAccount = JSON.parse(
  Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf8')
);

const sheetsClient = new google.auth.JWT(
  serviceAccount.client_email,
  null,
  serviceAccount.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

const SHEET_ID = process.env.GOOGLE_SHEETS_ID;

// ---------------------------------------------------------------------
// Preços em centavos
// ---------------------------------------------------------------------
function getValorServico(servico, tipoCliente) {
  // Se for parceiro (lojista), aplica valor especial fixo
  if (tipoCliente === 'parceiro') {
    return 3090; // R$ 30,90
  }

  // Cliente normal (site público)
  switch (servico) {
    case 'Consulta Classe A Plus':
      return 100;
    case 'Consulta Classe A Gold':
      return 5790;
    case 'Consulta Classe A Completa':
      return 6490;
    default:
      return 0;
  }
}

// ---------------------------------------------------------------------
// Função principal
// ---------------------------------------------------------------------
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ erro: 'Dados inválidos no corpo da requisição' });
  }

  try {
    // Agora recebendo também "loja" e "tipoCliente"
    const { solicitante, placa, whatsapp, servico, tipoCliente, loja } = req.body;
    console.log('🔸 Dados recebidos:', {
      solicitante,
      placa,
      whatsapp,
      servico,
      tipoCliente,
      loja
    });

    const valor = getValorServico(servico, tipoCliente);
    if (!valor) {
      return res.status(400).json({ erro: 'Serviço inválido' });
    }

    // txid válido [a-zA-Z0-9]{26,35}
    const txid = uuidv4().replace(/[^a-zA-Z0-9]/g, '').slice(0, 35);
    const dataAtual = new Date().toLocaleString('pt-BR');

    // -----------------------------------------------------------------
    // Montar payload da cobrança Pix
    // -----------------------------------------------------------------
    const payload = JSON.stringify({
      calendario: { expiracao: 3600 },
      devedor: {
        nome: solicitante || 'Cliente Visão Classe A',
        cpf: '00000000191' // Somente para ambiente de testes
      },
      valor: { original: (valor / 100).toFixed(2) },
      chave: process.env.GN_PIX_KEY,
      solicitacaoPagador: `${servico} - ${placa}`,
      infoAdicionais: [
        { nome: 'Placa', valor: placa },
        { nome: 'WhatsApp', valor: whatsapp },
        loja ? { nome: 'Loja', valor: loja } : null
      ].filter(Boolean)
    });

    const token = await getAccessToken();
    console.log('🔐 Token de acesso obtido');

    // Criação da cobrança
    const cobOptions = {
      hostname: 'api-pix.gerencianet.com.br',
      port: 443,
      path: `/v2/cob/${txid}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      agent
    };

    const gnRes = await httpRequest(cobOptions, payload);
    console.log('📦 Cobrança criada:', gnRes);

    if (!gnRes?.loc?.id) {
      throw new Error('Erro ao gerar cobrança Pix: ID não retornado');
    }

    // Recupera QR Code
    const qrcode = await getQrCode(gnRes.loc.id, token);
    console.log('✅ QR Code obtido');

    // -----------------------------------------------------------------
    // Grava no Google Sheets
    // -----------------------------------------------------------------
    await sheetsClient.authorize();
    const sheets = google.sheets({ version: 'v4', auth: sheetsClient });

    // Aba principal (Página1)
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Página1!A:I', // Agora até a coluna I (Loja, tipoCliente)
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            dataAtual,                   // A - Data
            solicitante,                 // B - Solicitante
            placa,                       // C - Placa
            whatsapp,                    // D - WhatsApp
            servico,                     // E - Serviço
            'Aguardando Pagamento',      // F - Status inicial
            txid,                        // G - TXID
            loja || '',                  // H - Loja
            tipoCliente || ''            // I - tipoCliente (parceiro / vazio)
          ]
        ]
      }
    });

    // Aba Logs (registro inicial)
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Logs!A:E',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            dataAtual,                   // Data do registro
            txid,                        // TXID
            (valor / 100).toFixed(2),    // Valor da cobrança
            '',                          // Horário do pagamento (preenchido via webhook)
            ''                           // endToEndId (preenchido via webhook)
          ]
        ]
      }
    });

    // Resposta para o front
    return res.status(200).json({
      imagemQrcode: qrcode.imagemQrcode,
      linkVisualizacao: qrcode.qrcode, // mantém compatibilidade
      pixCopiaECola: qrcode.qrcode,    // código para copiar e colar
      txid                             // usado para consultar status
    });
  } catch (error) {
    console.error('❌ Erro geral:', error);
    res
      .status(500)
      .json({ erro: 'Erro interno ao gerar Pix', detalhe: error.message });
  }
}

// ---------------------------------------------------------------------
// Recuperar access token
// ---------------------------------------------------------------------
async function getAccessToken() {
  const credentials = Buffer.from(
    `${process.env.GN_CLIENT_ID}:${process.env.GN_CLIENT_SECRET}`
  ).toString('base64');

  const options = {
    hostname: 'api-pix.gerencianet.com.br',
    port: 443,
    path: '/oauth/token',
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json'
    },
    agent
  };

  const payload = JSON.stringify({
    grant_type: 'client_credentials',
    scope: 'pix.write pix.read'
  });

  const res = await httpRequest(options, payload);
  if (!res?.access_token) {
    throw new Error('Token de acesso inválido ou não retornado');
  }
  return res.access_token;
}

// ---------------------------------------------------------------------
// Recuperar QR Code
// ---------------------------------------------------------------------
async function getQrCode(id, token) {
  const options = {
    hostname: 'api-pix.gerencianet.com.br',
    port: 443,
    path: `/v2/loc/${id}/qrcode`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    },
    agent
  };

  const response = await httpRequest(options);

  if (!response?.imagemQrcode || !response?.qrcode) {
    console.error('⚠️ Resposta de QR Code incompleta:', response);
    throw new Error('QR Code inválido ou não retornado.');
  }

  return response;
}

// ---------------------------------------------------------------------
// Função utilitária HTTP
// ---------------------------------------------------------------------
function httpRequest(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => (data += chunk));
      res.on('end', () => {
        try {
          const contentType = res.headers['content-type'] || '';
          if (contentType.includes('application/json')) {
            resolve(JSON.parse(data));
          } else {
            reject(new Error(`Resposta não-JSON: ${data}`));
          }
        } catch (e) {
          reject(new Error(`Erro ao parsear resposta: ${data}`));
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}
