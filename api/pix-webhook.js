// api/pix-webhook.js
import { google } from "googleapis";

export const config = {
  api: {
    bodyParser: false, // ✅ necessário na Vercel
  },
};

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método não permitido" });
    }

    // ✅ Parse seguro do corpo JSON
    const buffers = [];
    for await (const chunk of req) buffers.push(chunk);
    const rawBody = Buffer.concat(buffers).toString();
    const body = JSON.parse(rawBody);

    console.log("📩 Webhook recebido:", JSON.stringify(body, null, 2));

    const { pix } = req.body;

    // Caso o webhook seja apenas um teste da Gerencianet
    if (!pix) {
      console.log("📡 Webhook de teste recebido da Gerencianet");
      return res.status(200).json({ message: "Webhook de teste recebido" });
    }

    // Caso real de pagamento Pix
    if (!Array.isArray(pix)) {
      return res.status(400).json({ error: "Formato inválido" });
    }


    // 🔐 Autenticação Google Sheets
    const serviceAccount = JSON.parse(
      Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_BASE64, "base64").toString("utf8")
    );

    const auth = new google.auth.JWT(
      serviceAccount.client_email,
      null,
      serviceAccount.private_key,
      ["https://www.googleapis.com/auth/spreadsheets"]
    );
    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

    let atualizado = false;

    for (const pagamento of pix) {
      const { txid, endToEndId, valor, horario } = pagamento;
      console.log("💰 Processando PIX:", { txid, valor, horario });

      // 🔎 Página1
      const pag1 = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: "Página1!A2:G",
      });
      const rows = pag1.data.values || [];
      const idx = rows.findIndex((row) => row[6] === txid);

      if (idx !== -1) {
        const linha = idx + 2;
        if (rows[idx][5] !== "Pagamento Confirmado") {
          await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `Página1!F${linha}:G${linha}`,
            valueInputOption: "USER_ENTERED",
            requestBody: { values: [["Pagamento Confirmado", txid]] },
          });
          console.log(`✅ Página1 atualizada: TXID ${txid}`);
          atualizado = true;
        }
      } else {
        console.warn(`⚠️ TXID não encontrado em Página1: ${txid}`);
      }

      // 🧾 Logs
      const log = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: "Logs!A2:E",
      });
      const logs = log.data.values || [];
      const idxLog = logs.findIndex((row) => row[1] === txid);

      if (idxLog !== -1) {
        const rowLog = idxLog + 2;
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `Logs!D${rowLog}:E${rowLog}`,
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [[new Date(horario).toLocaleString("pt-BR"), endToEndId]],
          },
        });
        console.log(`✅ Logs atualizado: TXID ${txid}`);
      } else {
        console.warn(`⚠️ TXID não encontrado em Logs: ${txid}`);
      }
    }

    return res.status(200).json({ message: "Webhook processado", atualizado });
  } catch (err) {
    console.error("❌ Erro webhook:", err);
    return res.status(500).json({ error: "Erro interno", detalhe: err.message });
  }
}
