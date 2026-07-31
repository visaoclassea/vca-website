import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  FileSearch,
  MapPin,
  ShieldCheck,
  Smartphone,
  Users,
} from "lucide-react";
import styles from "./empresas.module.css";

const segmentos = [
  "Concessionárias e grupos automotivos",
  "Revendas e lojas de veículos",
  "Leilões e empresas de remarketing",
  "Bancos, financeiras e seguradoras",
  "Locadoras e gestores de frota",
  "Empresas com operações de compra e venda",
];

const diferenciais = [
  {
    icon: Users,
    title: "Equipe dedicada",
    text: "Organização da operação conforme volume, região e fluxo do parceiro.",
  },
  {
    icon: MapPin,
    title: "Atendimento In Loco",
    text: "Vistorias realizadas no pátio, loja, concessionária ou local indicado.",
  },
  {
    icon: FileSearch,
    title: "Laudos digitais",
    text: "Consulta, compartilhamento e acompanhamento por meio digital.",
  },
  {
    icon: Smartphone,
    title: "Tecnologia própria",
    text: "VCA Connect e soluções digitais para agilizar o acesso às informações.",
  },
  {
    icon: ShieldCheck,
    title: "Processos padronizados",
    text: "Critérios técnicos claros para manter consistência em cada inspeção.",
  },
  {
    icon: BadgeCheck,
    title: "Operação escalável",
    text: "Estrutura preparada para demandas recorrentes e volumes maiores.",
  },
];

export const metadata = {
  title: "Soluções para Empresas",
  description:
    "Vistorias veiculares para concessionárias, revendas, leilões, bancos, seguradoras e empresas no Rio Grande do Sul.",
};

export default function EmpresasPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.eyebrow}>Visão Classe A Empresas</span>
          <h1>Soluções técnicas para operações automotivas em escala.</h1>
          <p>
            Atendimento estruturado para concessionárias, revendas, leilões,
            instituições financeiras e empresas que precisam de agilidade,
            padronização e laudos digitais.
          </p>

          <div className={styles.actions}>
            <Link href="/contato" className={styles.primaryButton}>
              Falar com nossa equipe <ArrowRight size={18} />
            </Link>
            <a
              href="https://wa.me/5551991036561"
              target="_blank"
              rel="noreferrer"
              className={styles.secondaryButton}
            >
              Solicitar proposta
            </a>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.introGrid}>
            <div>
              <span className={styles.eyebrowDark}>Para quem atendemos</span>
              <h2>Uma solução adaptada ao fluxo de cada parceiro.</h2>
            </div>
            <div className={styles.segmentList}>
              {segmentos.map((segmento) => (
                <div key={segmento}>
                  <CheckCircle2 size={20} />
                  <span>{segmento}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.softSection}>
        <div className={styles.container}>
          <div className={styles.heading}>
            <span className={styles.eyebrowDark}>Diferenciais operacionais</span>
            <h2>Mais controle, velocidade e confiança em cada veículo.</h2>
          </div>

          <div className={styles.cards}>
            {diferenciais.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title}>
                  <div className={styles.iconBox}>
                    <Icon size={25} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.flowSection}>
        <div className={styles.container}>
          <div className={styles.flowGrid}>
            <div>
              <span className={styles.eyebrowLight}>Fluxo simplificado</span>
              <h2>Da solicitação ao laudo, tudo organizado.</h2>
              <p>
                Definimos com o parceiro os locais, volumes, tipos de vistoria,
                responsáveis e forma de entrega. A operação passa a seguir um
                fluxo padronizado, com acompanhamento digital.
              </p>
            </div>

            <div className={styles.steps}>
              <div><strong>01</strong><span>Definição da operação e dos serviços</span></div>
              <div><strong>02</strong><span>Agendamento ou atendimento recorrente</span></div>
              <div><strong>03</strong><span>Inspeção técnica e pesquisa veicular</span></div>
              <div><strong>04</strong><span>Entrega e consulta digital dos laudos</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.cta}>
            <div>
              <Building2 size={36} />
              <h2>Vamos estruturar uma operação para sua empresa?</h2>
              <p>
                Conte o volume, as cidades e o tipo de atendimento necessário.
                Prepararemos uma solução comercial e operacional adequada.
              </p>
            </div>
            <Link href="/contato" className={styles.primaryButton}>
              Solicitar contato <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
