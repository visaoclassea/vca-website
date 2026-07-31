"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  Clipboard,
  FileSearch,
  LoaderCircle,
  LockKeyhole,
  MessageCircle,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import styles from "./consulta-classe-a.module.css";

type Plano = {
  nome: string;
  valor: string;
  descricao: string;
  destaque?: boolean;
  itens: string[];
};

type PixResponse = {
  imagemQrcode?: string;
  pixCopiaECola?: string;
  linkVisualizacao?: string;
  txid?: string;
  erro?: string;
  detalhe?: string;
};

const planos: Plano[] = [
  {
    nome: "Consulta Classe A Plus",
    valor: "49,90",
    descricao: "Informações essenciais para uma primeira análise.",
    itens: [
      "Dados cadastrais do veículo",
      "Base estadual e nacional",
      "Roubo e furto",
      "Restrições e gravames",
    ],
  },
  {
    nome: "Consulta Classe A Gold",
    valor: "57,90",
    descricao: "Mais profundidade para avaliar riscos na negociação.",
    destaque: true,
    itens: [
      "Todos os dados do plano Plus",
      "Histórico de leilão",
      "Registros de sinistro",
      "Indícios e apontamentos relevantes",
    ],
  },
  {
    nome: "Consulta Classe A Completa",
    valor: "64,90",
    descricao: "A pesquisa mais completa para uma decisão segura.",
    itens: [
      "Todos os dados do plano Gold",
      "Histórico ampliado do veículo",
      "Quilometragem quando disponível",
      "Informações completas para negociação",
    ],
  },
];

function formatarPlaca(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 7);
}

function formatarWhatsApp(value: string) {
  const numeros = value.replace(/\D/g, "").slice(0, 11);

  if (numeros.length <= 2) return numeros;
  if (numeros.length <= 7) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
  }

  return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
}

export function ConsultaClasseAClient() {
  const [plano, setPlano] = useState(planos[1].nome);
  const [solicitante, setSolicitante] = useState("");
  const [placa, setPlaca] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [loja, setLoja] = useState("");
  const [parceiro, setParceiro] = useState(false);
  const [aceite, setAceite] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [pix, setPix] = useState<PixResponse | null>(null);
  const [status, setStatus] = useState("Aguardando Pagamento");
  const [copiado, setCopiado] = useState(false);

  const planoSelecionado = useMemo(
    () => planos.find((item) => item.nome === plano) ?? planos[1],
    [plano]
  );

  useEffect(() => {
    if (!pix?.txid || status === "Pagamento Confirmado") return;

    const intervalo = window.setInterval(async () => {
      try {
        const response = await fetch(
          `/api/check-status?txid=${encodeURIComponent(pix.txid ?? "")}`,
          { cache: "no-store" }
        );

        if (!response.ok) return;

        const data = await response.json();

        if (data.status) {
          setStatus(data.status);
        }
      } catch {
        // Mantém a página funcionando mesmo se uma verificação falhar.
      }
    }, 5000);

    return () => window.clearInterval(intervalo);
  }, [pix?.txid, status]);

  async function gerarPix(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");

    if (!solicitante.trim() || placa.length !== 7 || whatsapp.replace(/\D/g, "").length < 10) {
      setErro("Preencha nome, placa e WhatsApp corretamente.");
      return;
    }

    if (!aceite) {
      setErro("Confirme que os dados informados estão corretos.");
      return;
    }

    try {
      setCarregando(true);

      const response = await fetch("/api/create-pix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          solicitante: solicitante.trim(),
          placa,
          whatsapp: whatsapp.replace(/\D/g, ""),
          servico: plano,
          tipoCliente: parceiro ? "parceiro" : "",
          loja: parceiro ? loja.trim() : "",
        }),
      });

      const data: PixResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.erro || data.detalhe || "Não foi possível gerar o Pix.");
      }

      setPix(data);
      setStatus("Aguardando Pagamento");
      window.setTimeout(() => {
        document.getElementById("pagamento")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Erro ao gerar pagamento.");
    } finally {
      setCarregando(false);
    }
  }

  async function copiarPix() {
    const codigo = pix?.pixCopiaECola || pix?.linkVisualizacao;
    if (!codigo) return;

    await navigator.clipboard.writeText(codigo);
    setCopiado(true);
    window.setTimeout(() => setCopiado(false), 1800);
  }

  const pagamentoConfirmado = status.toLowerCase().includes("confirmado");

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div>
              <span className={styles.eyebrow}>Pesquisa veicular digital</span>
              <h1>Consulte antes de comprar. Decida com mais segurança.</h1>
              <p>
                A Consulta Classe A reúne informações importantes sobre o
                histórico do veículo para reduzir riscos e tornar sua negociação
                mais transparente.
              </p>

              <div className={styles.heroTrust}>
                <span><ShieldCheck size={20} /> Pagamento seguro via Pix</span>
                <span><Smartphone size={20} /> Resultado digital</span>
                <span><LockKeyhole size={20} /> Dados protegidos</span>
              </div>
            </div>

            <div className={styles.heroPanel}>
              <FileSearch size={42} />
              <strong>Antes de fechar negócio, pesquise.</strong>
              <p>
                Leilão, sinistro, roubo e furto, restrições, dados cadastrais e
                outros apontamentos podem mudar completamente uma decisão de compra.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.plansSection}>
        <div className={styles.container}>
          <div className={styles.heading}>
            <span className={styles.eyebrowDark}>Escolha sua consulta</span>
            <h2>Planos para diferentes níveis de análise.</h2>
          </div>

          <div className={styles.plansGrid}>
            {planos.map((item) => (
              <button
                key={item.nome}
                type="button"
                className={`${styles.planCard} ${
                  plano === item.nome ? styles.planSelected : ""
                } ${item.destaque ? styles.planFeatured : ""}`}
                onClick={() => setPlano(item.nome)}
              >
                {item.destaque && <span className={styles.featuredTag}>Mais escolhido</span>}
                <div className={styles.planTop}>
                  <div>
                    <h3>{item.nome.replace("Consulta Classe A ", "")}</h3>
                    <p>{item.descricao}</p>
                  </div>
                  <span className={styles.radio}>
                    {plano === item.nome && <Check size={17} />}
                  </span>
                </div>

                <div className={styles.price}>
                  <small>R$</small>
                  <strong>{item.valor}</strong>
                </div>

                <ul>
                  {item.itens.map((texto) => (
                    <li key={texto}>
                      <CheckCircle2 size={18} />
                      <span>{texto}</span>
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.checkoutSection}>
        <div className={styles.container}>
          <div className={styles.checkoutGrid}>
            <div className={styles.formCard}>
              <div className={styles.formHeading}>
                <span>1</span>
                <div>
                  <h2>Dados da solicitação</h2>
                  <p>Preencha corretamente para vincular o pagamento e a consulta.</p>
                </div>
              </div>

              <form onSubmit={gerarPix}>
                <div className={styles.field}>
                  <label htmlFor="solicitante">Nome do solicitante</label>
                  <input
                    id="solicitante"
                    value={solicitante}
                    onChange={(event) => setSolicitante(event.target.value)}
                    placeholder="Digite seu nome completo"
                    autoComplete="name"
                  />
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="placa">Placa do veículo</label>
                    <input
                      id="placa"
                      value={placa}
                      onChange={(event) => setPlaca(formatarPlaca(event.target.value))}
                      placeholder="ABC1D23"
                      maxLength={7}
                      className={styles.plateInput}
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="whatsapp">WhatsApp</label>
                    <input
                      id="whatsapp"
                      value={whatsapp}
                      onChange={(event) => setWhatsapp(formatarWhatsApp(event.target.value))}
                      placeholder="(51) 99999-9999"
                      inputMode="tel"
                      autoComplete="tel"
                    />
                  </div>
                </div>

                <label className={styles.partnerCheck}>
                  <input
                    type="checkbox"
                    checked={parceiro}
                    onChange={(event) => setParceiro(event.target.checked)}
                  />
                  <span>Sou parceiro/lojista cadastrado</span>
                </label>

                {parceiro && (
                  <div className={styles.field}>
                    <label htmlFor="loja">Nome da loja</label>
                    <input
                      id="loja"
                      value={loja}
                      onChange={(event) => setLoja(event.target.value)}
                      placeholder="Informe o nome da empresa"
                    />
                  </div>
                )}

                <label className={styles.confirmCheck}>
                  <input
                    type="checkbox"
                    checked={aceite}
                    onChange={(event) => setAceite(event.target.checked)}
                  />
                  <span>
                    Confirmo que placa e contato estão corretos. A consulta será
                    realizada para o veículo informado.
                  </span>
                </label>

                {erro && <div className={styles.errorBox}>{erro}</div>}

                <button type="submit" className={styles.submitButton} disabled={carregando}>
                  {carregando ? (
                    <>
                      <LoaderCircle size={19} className={styles.spin} />
                      Gerando Pix...
                    </>
                  ) : (
                    <>
                      Gerar pagamento Pix <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>

            <aside className={styles.summaryCard}>
              <span className={styles.summaryLabel}>Resumo do pedido</span>
              <h3>{planoSelecionado.nome}</h3>
              <p>{planoSelecionado.descricao}</p>

              <div className={styles.summaryLine}>
                <span>Consulta selecionada</span>
                <strong>R$ {parceiro ? "30,90" : planoSelecionado.valor}</strong>
              </div>

              {placa && (
                <div className={styles.summaryLine}>
                  <span>Placa</span>
                  <strong>{placa}</strong>
                </div>
              )}

              <div className={styles.secureInfo}>
                <LockKeyhole size={21} />
                <span>
                  O pagamento é processado via Pix. Após a confirmação, nossa
                  equipe dará andamento à consulta.
                </span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {pix && (
        <section id="pagamento" className={styles.paymentSection}>
          <div className={styles.container}>
            <div className={`${styles.paymentCard} ${pagamentoConfirmado ? styles.paymentSuccess : ""}`}>
              <div className={styles.paymentCopy}>
                <span className={styles.eyebrowDark}>
                  {pagamentoConfirmado ? "Pagamento confirmado" : "Finalize o pagamento"}
                </span>

                <h2>
                  {pagamentoConfirmado
                    ? "Recebemos seu pagamento."
                    : "Escaneie o QR Code ou copie o código Pix."}
                </h2>

                <p>
                  {pagamentoConfirmado
                    ? "A solicitação foi registrada com sucesso. Nossa equipe seguirá com o atendimento."
                    : "A confirmação ocorre automaticamente. Mantenha esta página aberta após pagar."}
                </p>

                <div className={styles.statusBox}>
                  {pagamentoConfirmado ? (
                    <BadgeCheck size={24} />
                  ) : (
                    <LoaderCircle size={24} className={styles.spin} />
                  )}
                  <div>
                    <small>Status</small>
                    <strong>{status}</strong>
                  </div>
                </div>

                {pagamentoConfirmado && (
                  <a
                    href="https://wa.me/5551991036561"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.whatsappButton}
                  >
                    <MessageCircle size={19} />
                    Falar com a equipe
                  </a>
                )}
              </div>

              {!pagamentoConfirmado && (
                <div className={styles.qrPanel}>
                  {pix.imagemQrcode && (
                    <img src={pix.imagemQrcode} alt="QR Code para pagamento Pix" />
                  )}

                  <button type="button" onClick={copiarPix} className={styles.copyButton}>
                    <Clipboard size={18} />
                    {copiado ? "Código copiado" : "Copiar Pix copia e cola"}
                  </button>

                  <small>O código expira em aproximadamente 60 minutos.</small>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
