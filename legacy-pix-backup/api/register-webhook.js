// register-webhook.js
const https = require("https");
const fs = require("fs");
const fetch = require("node-fetch");

const clientId = process.env.GN_CLIENT_ID;
const clientSecret = process.env.GN_CLIENT_SECRET;
const pixKey = process.env.GN_PIX_KEY;
const certPem = Buffer.from(process.env.GN_CERT_PEM_BASE64, "base64").toString("utf8");
const keyPem = Buffer.from(process.env.GN_CERT_KEY_BASE64, "base64").toString("utf8");

const certFile = "./temp-cert.pem";
const keyFile = "./temp-key.pem";

// Cria arquivos temporários com o conteúdo do certificado e da chave
fs.writeFileSync(certFile, certPem);
fs.writeFileSync(keyFile, keyPem);

const agent = new https.Agent({
  cert: fs.readFileSync(certFile),
  key: fs.readFileSync(keyFile),
  rejectUnauthorized: false,
});

const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

async function registerWebhook() {
  try {
    console.log("🔐 Solicitando token OAuth...");

    const tokenResponse = await fetch("https://api.gerencianet.com.br/v1/authorize", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
      agent,
      body: JSON.stringify({ grant_type: "client_credentials" }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenData?.access_token) {
      console.error("❌ Erro ao obter token:", tokenData);
      return;
    }

    const token = tokenData.access_token;
    console.log("✅ Token obtido com sucesso.");

    // URL pública da sua API hospedada no Vercel
    const webhookUrl = "https://visaopix.vercel.app/api/pix-webhook";

    console.log("🔗 Registrando webhook em:", webhookUrl);

    const response = await fetch(
      `https://api.gerencianet.com.br/v2/webhook/${encodeURIComponent(pixKey)}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        agent,
        body: JSON.stringify({ webhookUrl }),
      }
    );

    const data = await response.json();
    console.log("📬 Resposta do servidor:");
    console.log(data);
  } catch (error) {
    console.error("🚨 Erro durante o registro:", error);
  } finally {
    // Remove os arquivos temporários
    if (fs.existsSync(certFile)) fs.unlinkSync(certFile);
    if (fs.existsSync(keyFile)) fs.unlinkSync(keyFile);
  }
}

registerWebhook();
