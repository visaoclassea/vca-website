# VCA Website — Sprint 5 (Pix estabilizado)

Esta versão corrige a confirmação do Pix em duas camadas:

1. **Webhook Efí** atualiza a planilha assim que a notificação chega.
2. **Polling direto na Efí** confirma o pagamento e atualiza a planilha mesmo se o webhook atrasar ou falhar.

## Depois do deploy

1. Acesse `/api/pix-webhook` e confirme que aparece `ok: true`.
2. Acesse `/api/register-webhook` uma única vez para registrar o domínio atual.
3. Gere um Pix de teste e pague.
4. Em poucos segundos, o site e a planilha devem mudar para `Pagamento Confirmado`.

## Variáveis necessárias

- `GN_CLIENT_ID`
- `GN_CLIENT_SECRET`
- `GN_PIX_KEY`
- `GN_CERT_PEM_BASE64`
- `GN_CERT_KEY_BASE64`
- `GOOGLE_SHEETS_ID`
- `GOOGLE_SERVICE_ACCOUNT_BASE64` (preferencial) ou `GOOGLE_SERVICE_ACCOUNT`
- `PIX_WEBHOOK_URL` (opcional; sem ela, o domínio acessado é detectado automaticamente)

Não adicione `vercel.json`: o projeto usa a detecção nativa do Next.js na Vercel.
