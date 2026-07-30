# VCA Website — Sprint 4

Página Consulta Classe A com checkout Pix integrado ao mesmo contrato de API do sistema original.

## Antes de testar pagamento na Vercel
Copie para este projeto todas as variáveis de ambiente do projeto Pix atual. Não remova nem altere o projeto atual antes de validar geração, QR Code, copia e cola, status, webhook e planilha.

O frontend usa `/api/create-pix` e `/api/check-status`. Opcionalmente, `NEXT_PUBLIC_PIX_API_BASE_URL` pode apontar temporariamente para o backend Pix atual durante os testes.
