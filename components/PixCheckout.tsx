"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CheckCircle2, Clipboard, LoaderCircle, QrCode, ShieldCheck } from "lucide-react";

type PixResponse = {
  imagemQrcode: string;
  linkVisualizacao: string;
  pixCopiaECola?: string;
  txid?: string;
};

type FormState = {
  solicitante: string;
  placa: string;
  whatsapp: string;
  servico: string;
};

const initialForm: FormState = {
  solicitante: "",
  placa: "",
  whatsapp: "",
  servico: "Consulta Classe A Plus",
};

const API_BASE = process.env.NEXT_PUBLIC_PIX_API_BASE_URL ?? "";

export default function PixCheckout() {
  const [form, setForm] = useState(initialForm);
  const [pix, setPix] = useState<PixResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paid, setPaid] = useState(false);
  const [copied, setCopied] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  async function checkStatus(txid: string) {
    try {
      const response = await fetch(`${API_BASE}/api/check-status?txid=${encodeURIComponent(txid)}`, {
        cache: "no-store",
      });
      if (!response.ok) return;
      const data = await response.json();
      const confirmed = ["Pagamento Confirmado", "CONCLUIDA", "PAGO"].includes(data?.status);
      if (!confirmed) return;

      setPaid(true);
      if (intervalRef.current) clearInterval(intervalRef.current);

      const win = window as typeof window & { gtag?: (...args: unknown[]) => void };
      win.gtag?.("event", "conversion", {
        send_to: "AW-17520452776/asZCKEa_8sBEKJs6J8",
        value: 1.0,
        currency: "BRL",
        transaction_id: txid,
      });
    } catch (statusError) {
      console.error("Erro ao verificar pagamento:", statusError);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setPix(null);
    setPaid(false);

    try {
      const payload = {
        ...form,
        placa: form.placa.trim().toUpperCase(),
        solicitante: form.solicitante.trim(),
        whatsapp: form.whatsapp.trim(),
      };

      const response = await fetch(`${API_BASE}/api/create-pix`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `Não foi possível gerar o Pix (HTTP ${response.status}).`);
      }

      const data = (await response.json()) as PixResponse;
      if (!data.imagemQrcode || !data.linkVisualizacao) {
        throw new Error("A API não retornou um QR Code válido.");
      }

      setPix(data);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (data.txid) {
        void checkStatus(data.txid);
        intervalRef.current = setInterval(() => checkStatus(data.txid!), 5000);
      }
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Erro inesperado ao gerar o pagamento.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function copyPix() {
    if (!pix?.pixCopiaECola) return;
    await navigator.clipboard.writeText(pix.pixCopiaECola);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="pix-checkout-grid">
      <section className="pix-form-card">
        <div className="pix-card-heading">
          <span className="pix-icon"><QrCode size={24} /></span>
          <div>
            <span className="eyebrow">Pagamento seguro</span>
            <h2>Solicite sua consulta</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="pix-form">
          <label>
            Nome do solicitante
            <input
              required
              value={form.solicitante}
              onChange={(event) => setForm({ ...form, solicitante: event.target.value })}
              placeholder="Digite seu nome"
            />
          </label>

          <div className="pix-form-row">
            <label>
              Placa do veículo
              <input
                required
                maxLength={8}
                value={form.placa}
                onChange={(event) => setForm({ ...form, placa: event.target.value.toUpperCase() })}
                placeholder="ABC1D23"
              />
            </label>
            <label>
              WhatsApp
              <input
                required
                value={form.whatsapp}
                onChange={(event) => setForm({ ...form, whatsapp: event.target.value })}
                placeholder="(51) 99999-9999"
              />
            </label>
          </div>

          <label>
            Escolha a consulta
            <select value={form.servico} onChange={(event) => setForm({ ...form, servico: event.target.value })}>
              <option value="Consulta Classe A Plus">Consulta Classe A Plus — R$ 49,90</option>
              <option value="Consulta Classe A Gold">Consulta Classe A Gold — R$ 57,90</option>
              <option value="Consulta Classe A Completa">Consulta Classe A Completa — R$ 64,90</option>
            </select>
          </label>

          <button className="btn btn-primary pix-submit" disabled={loading} type="submit">
            {loading ? <><LoaderCircle className="spin" size={19} /> Gerando pagamento...</> : "Gerar QR Code Pix"}
          </button>
          <p className="pix-security"><ShieldCheck size={16} /> Pagamento processado com segurança via Pix.</p>
          {error && <div className="pix-error">{error}</div>}
        </form>
      </section>

      <aside className={`pix-result-card ${pix ? "is-active" : ""}`}>
        {!pix ? (
          <div className="pix-empty-state">
            <div className="pix-brand-row">
              <Image src="/logo.png" width={180} height={62} alt="Visão Classe A" />
              <span />
              <Image src="/pix.png" width={70} height={70} alt="Pix" />
            </div>
            <QrCode size={78} strokeWidth={1.4} />
            <h3>Seu QR Code aparecerá aqui</h3>
            <p>Preencha os dados ao lado para gerar o pagamento da consulta escolhida.</p>
          </div>
        ) : paid ? (
          <div className="pix-paid-state">
            <CheckCircle2 size={72} />
            <h3>Pagamento recebido!</h3>
            <p>Já estamos preparando sua consulta e ela será encaminhada ao WhatsApp informado.</p>
            <small>Pagamentos após as 18h serão atendidos no próximo dia útil, a partir das 8h30.</small>
          </div>
        ) : (
          <div className="pix-payment-state">
            <div className="pix-brand-row compact">
              <Image src="/logo.png" width={160} height={55} alt="Visão Classe A" />
              <span />
              <Image src="/pix.png" width={58} height={58} alt="Pix" />
            </div>
            <h3>Pagamento via Pix</h3>
            <p>Escaneie o QR Code ou use o código copia e cola.</p>
            {/* A imagem é retornada como data URL pela API do provedor. */}
            <img className="pix-qrcode" src={pix.imagemQrcode} alt="QR Code para pagamento Pix" />
            <a className="pix-pay-link" href={pix.linkVisualizacao} target="_blank" rel="noreferrer">Abrir pagamento em outra tela</a>
            <div className="pix-copy-box">
              <input readOnly value={pix.pixCopiaECola ?? ""} aria-label="Código Pix copia e cola" />
              <button type="button" onClick={copyPix}><Clipboard size={17} /> {copied ? "Copiado" : "Copiar"}</button>
            </div>
            <div className="pix-waiting"><LoaderCircle className="spin" size={16} /> Aguardando confirmação do pagamento...</div>
          </div>
        )}
      </aside>
    </div>
  );
}
