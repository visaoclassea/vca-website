import { google } from "googleapis";

function loadServiceAccount() {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_BASE64) {
    return JSON.parse(
      Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_BASE64, "base64").toString("utf8")
    );
  }
  if (process.env.GOOGLE_SERVICE_ACCOUNT) {
    return JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
  }
  throw new Error("GOOGLE_SERVICE_ACCOUNT_BASE64 ou GOOGLE_SERVICE_ACCOUNT não configurada");
}

export async function getSheetsClient() {
  const credentials = loadServiceAccount();
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

export function getSpreadsheetId() {
  if (!process.env.GOOGLE_SHEETS_ID) {
    throw new Error("GOOGLE_SHEETS_ID não configurada");
  }
  return process.env.GOOGLE_SHEETS_ID;
}

export async function findPaymentByTxid(txid) {
  const sheets = await getSheetsClient();
  const spreadsheetId = getSpreadsheetId();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Página1!A2:I",
  });
  const rows = response.data.values || [];
  const index = rows.findIndex((row) => row[6] === txid);
  return { sheets, spreadsheetId, rows, index, row: index >= 0 ? rows[index] : null };
}

export async function confirmPaymentInSheet({ txid, endToEndId = "", horario = new Date().toISOString() }) {
  const found = await findPaymentByTxid(txid);
  if (found.index < 0) return { updated: false, found: false };

  const line = found.index + 2;
  if (found.row?.[5] !== "Pagamento Confirmado") {
    await found.sheets.spreadsheets.values.update({
      spreadsheetId: found.spreadsheetId,
      range: `Página1!F${line}:G${line}`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [["Pagamento Confirmado", txid]] },
    });
  }

  try {
    const logsResponse = await found.sheets.spreadsheets.values.get({
      spreadsheetId: found.spreadsheetId,
      range: "Logs!A2:E",
    });
    const logs = logsResponse.data.values || [];
    const logIndex = logs.findIndex((row) => row[1] === txid);
    if (logIndex >= 0) {
      await found.sheets.spreadsheets.values.update({
        spreadsheetId: found.spreadsheetId,
        range: `Logs!D${logIndex + 2}:E${logIndex + 2}`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [[new Date(horario).toLocaleString("pt-BR"), endToEndId]],
        },
      });
    }
  } catch (error) {
    console.warn("Não foi possível atualizar a aba Logs:", error.message);
  }

  return { updated: true, found: true };
}
