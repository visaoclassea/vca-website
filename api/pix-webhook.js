import { confirmPaymentInSheet } from "./_lib/sheets.js";

export const config = { api: { bodyParser: true } };

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body || "{}");
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ ok: true, service: "pix-webhook" });
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const body = await readBody(req);
    console.log("Webhook Pix recebido:", JSON.stringify(body));
    const pix = body?.pix;

    // Requisição de validação/teste da Efí.
    if (!Array.isArray(pix) || pix.length === 0) {
      return res.status(200).send("200");
    }

    const results = [];
    for (const payment of pix) {
      if (!payment?.txid) continue;
      const result = await confirmPaymentInSheet({
        txid: payment.txid,
        endToEndId: payment.endToEndId || "",
        horario: payment.horario || new Date().toISOString(),
      });
      results.push({ txid: payment.txid, ...result });
    }

    console.log("Webhook Pix processado:", results);
    return res.status(200).send("200");
  } catch (error) {
    console.error("Erro no webhook Pix:", error.message);
    return res.status(500).json({ error: "Erro interno", detail: error.message });
  }
}
