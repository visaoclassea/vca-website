// api/poll-pix-status.js

import { google } from 'googleapis';
import axios from 'axios';
import https from 'https';
import dotenv from 'dotenv';
dotenv.config();

const base64ToPem = (base64) => {
  return Buffer.from(base64, 'base64').toString('utf-8');
};

const cert = base64ToPem(process.env.GN_CERT_PEM_BASE64);
const key = base64ToPem(process.env.GN_CERT_KEY_BASE64);

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).send('Método não permitido');

  try {
    // Lê a planilha
    const readRes = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'A2:G',
    });

    const rows = readRes.data.values || [];
    let updatedCount = 0;

    const httpsAgent = new https.Agent({ cert, key });

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const txid = row[6];
      const status = row[5];

      if (status === 'Aguardando Pagamento' && txid) {
        const url = `https://api-pix.gerencianet.com.br/v2/cob/${txid}`;
        const tokenRes = await axios.post(
          'https://api-pix.gerencianet.com.br/oauth/token',
          { grant_type: 'client_credentials' },
          {
            auth: {
              username: process.env.GN_CLIENT_ID,
              password: process.env.GN_CLIENT_SECRET,
            },
            httpsAgent,
            headers: { 'Content-Type': 'application/json' },
          }
        );

        const token = tokenRes.data.access_token;

        const cobRes = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
          httpsAgent,
        });

        if (cobRes.data?.status === 'CONCLUIDA') {
          await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `F${i + 2}`,
            valueInputOption: 'RAW',
            requestBody: { values: [['Pagamento Confirmado']] },
          });

          updatedCount++;
        }
      }
    }

    res.status(200).json({ atualizados: updatedCount });
  } catch (err) {
    console.error('Erro ao verificar pagamentos:', err);
    res.status(500).send('Erro interno');
  }
}
