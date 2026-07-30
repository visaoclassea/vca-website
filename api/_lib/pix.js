import https from "https";

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Variável de ambiente ausente: ${name}`);
  return value;
}

export function getPixAgent() {
  const cert = Buffer.from(requireEnv("GN_CERT_PEM_BASE64"), "base64").toString("utf8");
  const key = Buffer.from(requireEnv("GN_CERT_KEY_BASE64"), "base64").toString("utf8");
  return new https.Agent({ cert, key, keepAlive: true });
}

export function pixRequest({ method, path, token, body, extraHeaders = {} }) {
  const agent = getPixAgent();
  return new Promise((resolve, reject) => {
    const payload = body === undefined ? null : JSON.stringify(body);
    const req = https.request(
      {
        hostname: "api-pix.gerencianet.com.br",
        port: 443,
        path,
        method,
        agent,
        headers: {
          Accept: "application/json",
          ...(payload ? { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(payload) } : {}),
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...extraHeaders,
        },
      },
      (response) => {
        let raw = "";
        response.on("data", (chunk) => (raw += chunk));
        response.on("end", () => {
          let data = raw;
          try {
            data = raw ? JSON.parse(raw) : {};
          } catch {
            // Mantém texto puro para diagnóstico.
          }

          if (response.statusCode >= 200 && response.statusCode < 300) {
            resolve(data);
            return;
          }

          const error = new Error(`Efí respondeu HTTP ${response.statusCode}`);
          error.statusCode = response.statusCode;
          error.details = data;
          reject(error);
        });
      }
    );

    req.on("error", reject);
    if (payload) req.write(payload);
    req.end();
  });
}

export async function getPixAccessToken() {
  const credentials = Buffer.from(
    `${requireEnv("GN_CLIENT_ID")}:${requireEnv("GN_CLIENT_SECRET")}`
  ).toString("base64");

  const data = await pixRequest({
    method: "POST",
    path: "/oauth/token",
    body: { grant_type: "client_credentials" },
    extraHeaders: { Authorization: `Basic ${credentials}` },
  });

  if (!data?.access_token) throw new Error("Token Pix não retornado pela Efí");
  return data.access_token;
}

export async function getCharge(txid) {
  const token = await getPixAccessToken();
  return pixRequest({
    method: "GET",
    path: `/v2/cob/${encodeURIComponent(txid)}`,
    token,
  });
}
