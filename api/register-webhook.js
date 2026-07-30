import { getPixAccessToken, pixRequest } from "./_lib/pix.js";

function resolveWebhookUrl(req) {
  if (process.env.PIX_WEBHOOK_URL) return process.env.PIX_WEBHOOK_URL;
  const forwardedHost = req.headers["x-forwarded-host"];
  const host = forwardedHost || req.headers.host;
  if (!host) throw new Error("Não foi possível determinar o domínio público");
  return `https://${host}/api/pix-webhook?ignorar=`;
}

export default async function handler(req, res) {
  if (!["GET", "POST"].includes(req.method)) {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const webhookUrl = resolveWebhookUrl(req);
    const token = await getPixAccessToken();
    const pixKey = process.env.GN_PIX_KEY;
    if (!pixKey) throw new Error("GN_PIX_KEY não configurada");

    const result = await pixRequest({
      method: "PUT",
      path: `/v2/webhook/${encodeURIComponent(pixKey)}`,
      token,
      body: { webhookUrl },
      // Vercel não valida certificado cliente na entrada; a Efí permite este modo no cadastro.
      extraHeaders: { "x-skip-mtls-checking": "true" },
    });

    console.log("Webhook cadastrado:", webhookUrl, result);
    return res.status(200).json({
      ok: true,
      message: "Webhook Pix registrado com sucesso",
      webhookUrl,
      provider: result,
    });
  } catch (error) {
    console.error("Erro ao registrar webhook:", error.details || error.message);
    return res.status(error.statusCode || 500).json({
      ok: false,
      error: "Não foi possível registrar o webhook",
      detail: error.details || error.message,
    });
  }
}
