// /api/check-status.js

import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
import axios from 'axios';

const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
const sheets = google.sheets('v4');

const auth = new GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const sheetId = process.env.GOOGLE_SHEETS_ID;
const range = 'A2:G'; // Onde os dados estão armazenados

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send('Método não permitido');
  }

  const { txid } = req.query;

  try {
    const client = await auth.getClient();

    // 1. Buscar os dados da planilha
    const { data } = await sheets.spreadsheets.values.get({
      auth: client,
      spreadsheetId: sheetId,
      range
    });

    const rows = data.values || [];

    // 🔹 MODO NOVO: quando vier txid, responde status para o site
    if (txid) {
      const row = rows.find(r => r[6] === txid); // col G = txid

      if (!row) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }

      const status = row[5] || 'Indefinido'; // col F = status

      return res.status(200).json({
        txid,
        status
      });
    }

    // 🔹 MODO ANTIGO (mantido): sem txid, varre todos aguardando pagamento
    const updatedRows = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const status = row[5]; // Coluna Status (índice F = 5)
      const txidLinha = row[6]; // Coluna TXID (índice G = 6)

      if (status === 'Aguardando Pagamento' && txidLinha) {
        const paymentStatus = await checkPixStatus(txidLinha);

        if (paymentStatus === 'CONCLUIDA') {
          row[5] = 'Pagamento Confirmado'; // Atualiza status na linha
          updatedRows.push({ index: i, values: row });
        }
      }
    }

    if (updatedRows.length > 0) {
      const updatedValues = rows.map(r => r);
      await sheets.spreadsheets.values.update({
        auth: client,
        spreadsheetId: sheetId,
        range,
        valueInputOption: 'RAW',
        requestBody: { values: updatedValues }
      });
    }

    res.status(200).json({ updated: updatedRows.length });
  } catch (error) {
    console.error('Erro ao verificar pagamentos:', error);
    res.status(500).json({ error: 'Erro ao verificar pagamentos' });
  }
}

async function checkPixStatus(txid) {
  try {
    const credentials = {
      client_id: process.env.GN_CLIENT_ID,
      client_secret: process.env.GN_CLIENT_SECRET
    };

    const cert = Buffer.from(process.env.CERT_PEM_BASE64, 'base64').toString('utf-8');
    const key = Buffer.from(process.env.CERT_KEY_BASE64, 'base64').toString('utf-8');

    const https = (await import('https')).default;
    const agent = new https.Agent({
      cert,
      key
    });

    const tokenResponse = await axios.post(
      'https://api-pix.gerencianet.com.br/oauth/token',
      {
        grant_type: 'client_credentials'
      },
      {
        auth: {
          username: credentials.client_id,
          password: credentials.client_secret
        },
        headers: { 'Content-Type': 'application/json' },
        httpsAgent: agent
      }
    );

    const accessToken = tokenResponse.data.access_token;

    const txResponse = await axios.get(
      `https://api-pix.gerencianet.com.br/v2/cob/${txid}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        httpsAgent: agent
      }
    );

    return txResponse.data.status;
  } catch (err) {
    console.error('Erro consultando PIX:', err.response?.data || err.message);
    return null;
  }
}
