import { getCharge } from "./_lib/pix.js";
import { confirmPaymentInSheet, findPaymentByTxid } from "./_lib/sheets.js";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store, max-age=0");
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const txid = typeof req.query.txid === "string" ? req.query.txid.trim() : "";
  if (!txid) return res.status(400).json({ error: "TXID não informado" });

  try {
    const payment = await findPaymentByTxid(txid);
    if (!payment.row) return res.status(404).json({ error: "Pedido não encontrado" });

    const sheetStatus = payment.row[5] || "Aguardando Pagamento";
    if (sheetStatus === "Pagamento Confirmado") {
      return res.status(200).json({ txid, status: sheetStatus, source: "sheet" });
    }

    // Confirma diretamente na Efí. Assim o site não depende somente do webhook.
    const charge = await getCharge(txid);
    const providerStatus = charge?.status || "INDEFINIDO";

    if (providerStatus === "CONCLUIDA") {
      await confirmPaymentInSheet({ txid });
      return res.status(200).json({ txid, status: "Pagamento Confirmado", providerStatus, source: "efi" });
    }

    return res.status(200).json({ txid, status: sheetStatus, providerStatus, source: "efi" });
  } catch (error) {
    console.error("Erro ao verificar Pix:", error.details || error.message);
    return res.status(500).json({
      error: "Erro ao verificar pagamento",
      detail: error.details || error.message,
    });
  }
}
