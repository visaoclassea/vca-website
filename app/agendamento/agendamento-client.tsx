"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Car,
  CheckCircle2,
  Clock3,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import styles from "./agendamento.module.css";

const servicos = [
  "Vistoria Cautelar Estrutural",
  "Vistoria Cautelar com Análise de Pintura",
  "Vistoria Completa com Análise Mecânica",
  "Vistoria de Moto",
  "Vistoria de Caminhão ou Van",
  "Outro serviço",
];

function formatarWhatsApp(value: string) {
  const numeros = value.replace(/\D/g, "").slice(0, 11);
  if (numeros.length <= 2) return numeros;
  if (numeros.length <= 7) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
  return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
}

function formatarPlaca(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 7);
}

export function AgendamentoClient() {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [servico, setServico] = useState(servicos[0]);
  const [placa, setPlaca] = useState("");
  const [local, setLocal] = useState("Unidade Visão Classe A");
  const [cidade, setCidade] = useState("Porto Alegre");
  const [data, setData] = useState("");
  const [periodo, setPeriodo] = useState("Manhã");
  const [observacoes, setObservacoes] = useState("");
  const [erro, setErro] = useState("");

  const hoje = useMemo(() => new Date().toISOString().split("T")[0], []);

  function enviarWhatsApp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");

    if (!nome.trim() || whatsapp.replace(/\D/g, "").length < 10 || !data) {
      setErro("Preencha nome, WhatsApp e data desejada.");
      return;
    }

    const mensagem = [
      "Olá! Gostaria de solicitar um agendamento com a Visão Classe A.",
      "",
      `Nome: ${nome.trim()}`,
      `WhatsApp: ${whatsapp}`,
      `Serviço: ${servico}`,
      `Placa: ${placa || "Ainda não informada"}`,
      `Atendimento: ${local}`,
      `Cidade: ${cidade}`,
      `Data desejada: ${data.split("-").reverse().join("/")}`,
      `Período: ${periodo}`,
      `Observações: ${observacoes.trim() || "Nenhuma"}`,
      "",
      "Aguardo a confirmação de disponibilidade.",
    ].join("\n");

    window.open(
      `https://wa.me/5551991036561?text=${encodeURIComponent(mensagem)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div>
              <span className={styles.eyebrow}>Agendamento</span>
              <h1>Solicite sua vistoria de forma simples e rápida.</h1>
              <p>
                Informe o serviço, o veículo e a data desejada. A solicitação será
                enviada diretamente para nossa equipe, que confirmará a
                disponibilidade pelo WhatsApp.
              </p>

              <div className={styles.heroBenefits}>
                <span><CheckCircle2 size={20} /> Atendimento na unidade</span>
                <span><CheckCircle2 size={20} /> Vistoria móvel In Loco</span>
                <span><CheckCircle2 size={20} /> Confirmação pelo WhatsApp</span>
              </div>
            </div>

            <div className={styles.heroCard}>
              <CalendarDays size={42} />
              <strong>Escolha a melhor opção para você.</strong>
              <p>
                Atendemos particulares, lojistas, concessionárias e empresas em
                Porto Alegre e nas principais cidades do Rio Grande do Sul.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className={styles.container}>
          <div className={styles.bookingGrid}>
            <form className={styles.formCard} onSubmit={enviarWhatsApp}>
              <div className={styles.formTitle}>
                <span>Solicitação de agendamento</span>
                <h2>Preencha os dados abaixo</h2>
                <p>
                  O envio não confirma automaticamente o horário. Nossa equipe
                  retornará para concluir o agendamento.
                </p>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="nome">Nome</label>
                  <input
                    id="nome"
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                    placeholder="Seu nome completo"
                    autoComplete="name"
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

              <div className={styles.field}>
                <label htmlFor="servico">Serviço desejado</label>
                <select
                  id="servico"
                  value={servico}
                  onChange={(event) => setServico(event.target.value)}
                >
                  {servicos.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
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
                  <label htmlFor="cidade">Cidade</label>
                  <input
                    id="cidade"
                    value={cidade}
                    onChange={(event) => setCidade(event.target.value)}
                    placeholder="Cidade do atendimento"
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label>Tipo de atendimento</label>
                <div className={styles.optionGrid}>
                  {["Unidade Visão Classe A", "Atendimento In Loco"].map((opcao) => (
                    <button
                      key={opcao}
                      type="button"
                      onClick={() => setLocal(opcao)}
                      className={local === opcao ? styles.optionSelected : ""}
                    >
                      {opcao === "Unidade Visão Classe A" ? <ShieldCheck size={21} /> : <MapPin size={21} />}
                      <span>{opcao}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="data">Data desejada</label>
                  <input
                    id="data"
                    type="date"
                    min={hoje}
                    value={data}
                    onChange={(event) => setData(event.target.value)}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="periodo">Período preferencial</label>
                  <select
                    id="periodo"
                    value={periodo}
                    onChange={(event) => setPeriodo(event.target.value)}
                  >
                    <option>Manhã</option>
                    <option>Tarde</option>
                    <option>Qualquer horário</option>
                  </select>
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="observacoes">Observações</label>
                <textarea
                  id="observacoes"
                  value={observacoes}
                  onChange={(event) => setObservacoes(event.target.value)}
                  placeholder="Informe modelo do veículo, endereço para atendimento In Loco ou outras observações."
                  rows={5}
                />
              </div>

              {erro && <div className={styles.errorBox}>{erro}</div>}

              <button type="submit" className={styles.submitButton}>
                <MessageCircle size={20} />
                Enviar solicitação pelo WhatsApp
                <ArrowRight size={18} />
              </button>
            </form>

            <aside className={styles.infoColumn}>
              <div className={styles.infoCard}>
                <Clock3 size={29} />
                <h3>Como funciona</h3>
                <ol>
                  <li>
                    <strong>1</strong>
                    <span>Você envia a solicitação com os dados do veículo.</span>
                  </li>
                  <li>
                    <strong>2</strong>
                    <span>Nossa equipe verifica rota, serviço e disponibilidade.</span>
                  </li>
                  <li>
                    <strong>3</strong>
                    <span>O horário é confirmado diretamente pelo WhatsApp.</span>
                  </li>
                </ol>
              </div>

              <div className={styles.contactCard}>
                <Car size={30} />
                <h3>Precisa de ajuda para escolher?</h3>
                <p>
                  Fale com nossa equipe para entender qual vistoria é mais adequada
                  ao veículo e à sua negociação.
                </p>
                <a
                  href="https://wa.me/5551991036561"
                  target="_blank"
                  rel="noreferrer"
                >
                  Conversar agora <ArrowRight size={17} />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
