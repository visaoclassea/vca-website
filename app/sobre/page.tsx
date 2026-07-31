import Image from "next/image";
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
import styles from "./sobre.module.css";

const pilares = [
  {
    icon: ShieldCheck,
    title: "Critério técnico",
    text: "Inspeções conduzidas com procedimentos padronizados e foco em informações relevantes para a decisão.",
  },
  {
    icon: Users,
    title: "Atendimento próximo",
    text: "Relacionamento direto com particulares, lojistas, concessionárias e empresas de diferentes portes.",
  },
  {
    icon: Smartphone,
    title: "Tecnologia própria",
    text: "Ferramentas digitais para consultar, compartilhar e acompanhar laudos com mais agilidade.",
  },
  {
    icon: Building2,
    title: "Estrutura preparada",
    text: "Unidade física, equipe móvel e capacidade para operações recorrentes ou de maior volume.",
  },
];

const valores = [
  "Transparência em cada avaliação",
  "Responsabilidade nas informações emitidas",
  "Padronização dos processos",
  "Evolução técnica e tecnológica contínua",
  "Compromisso com clientes e parceiros",
  "Clareza para apoiar decisões mais seguras",
];

export const metadata = {
  title: "Sobre Nós",
  description:
    "Conheça a Visão Classe A, empresa de inspeções veiculares com experiência automotiva, tecnologia própria e atendimento no Rio Grande do Sul.",
};

export default function SobrePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>Sobre a Visão Classe A</span>
              <h1>Experiência automotiva transformada em segurança.</h1>
              <p>
                A Visão Classe A combina conhecimento técnico, processos
                padronizados e soluções digitais para entregar inspeções
                veiculares mais claras, rápidas e confiáveis.
              </p>
              <Link href="/agendamento" className={styles.primaryButton}>
                Solicitar vistoria <ArrowRight size={18} />
              </Link>
            </div>

            <div className={styles.heroImageWrap}>
              <Image
                src="/images/fabricio.png"
                alt="Profissional da Visão Classe A"
                width={1024}
                height={1024}
                priority
                className={styles.heroImage}
                sizes="(max-width: 900px) 100vw, 44vw"
              />
              <div className={styles.heroBadge}>
                <strong>20+ anos</strong>
                <span>de experiência no setor automotivo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.storySection}>
        <div className={styles.container}>
          <div className={styles.storyGrid}>
            <div>
              <span className={styles.eyebrowDark}>Nossa história</span>
              <h2>Uma empresa criada para elevar o padrão das inspeções veiculares.</h2>
            </div>

            <div className={styles.storyText}>
              <p>
                A Visão Classe A nasceu da experiência acumulada ao longo de mais
                de duas décadas no setor automotivo. A proposta sempre foi ir
                além de uma simples conferência visual: transformar conhecimento
                técnico em informações úteis para quem compra, vende ou administra
                veículos.
              </p>
              <p>
                Desde o início da operação, a empresa passou a atender clientes
                particulares, revendas, concessionárias e empresas, oferecendo
                vistorias cautelares, pesquisas veiculares, inspeções completas e
                atendimento In Loco.
              </p>
              <p>
                O investimento em tecnologia própria ampliou esse propósito. Com
                soluções como o VCA Connect e a Consulta Classe A, o acesso aos
                laudos e históricos veiculares tornou-se mais rápido, organizado e
                adequado a operações de diferentes tamanhos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.numbersSection}>
        <div className={styles.container}>
          <div className={styles.numbersGrid}>
            <div>
              <strong>+7.000</strong>
              <span>vistorias realizadas</span>
            </div>
            <div>
              <strong>20+</strong>
              <span>anos de experiência automotiva</span>
            </div>
            <div>
              <strong>RS</strong>
              <span>atendimento nas principais cidades</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>laudos digitais</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.pillarsSection}>
        <div className={styles.container}>
          <div className={styles.heading}>
            <span className={styles.eyebrowDark}>Como trabalhamos</span>
            <h2>Engenharia, processos e tecnologia na mesma operação.</h2>
          </div>

          <div className={styles.cards}>
            {pilares.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title}>
                  <div className={styles.iconBox}>
                    <Icon size={26} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.structureSection}>
        <div className={styles.container}>
          <div className={styles.structureGrid}>
            <div className={styles.structureImageWrap}>
              <Image
                src="/images/hero.png"
                alt="Unidade da Visão Classe A em Porto Alegre"
                fill
                className={styles.structureImage}
                sizes="(max-width: 900px) 100vw, 52vw"
              />
            </div>

            <div className={styles.structureCopy}>
              <span className={styles.eyebrowLight}>Nossa estrutura</span>
              <h2>Unidade física, equipe móvel e operação digital.</h2>
              <p>
                A Visão Classe A está preparada para atender clientes em sua
                unidade de Porto Alegre e também diretamente em lojas, pátios,
                concessionárias e empresas.
              </p>

              <div className={styles.checkList}>
                <div><CheckCircle2 size={21} /><span>Atendimento presencial e In Loco</span></div>
                <div><CheckCircle2 size={21} /><span>Laudos e pesquisas 100% digitais</span></div>
                <div><CheckCircle2 size={21} /><span>Estrutura para operações recorrentes</span></div>
                <div><CheckCircle2 size={21} /><span>Atuação nas principais cidades do RS</span></div>
              </div>

              <Link href="/contato" className={styles.primaryButton}>
                Falar com nossa equipe <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <div className={styles.valuesGrid}>
            <div>
              <span className={styles.eyebrowDark}>Nossos valores</span>
              <h2>Confiança construída por meio de informação clara.</h2>
            </div>

            <div className={styles.valuesList}>
              {valores.map((valor) => (
                <div key={valor}>
                  <BadgeCheck size={21} />
                  <span>{valor}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.techSection}>
        <div className={styles.container}>
          <div className={styles.techGrid}>
            <div>
              <span className={styles.eyebrowLight}>Evolução contínua</span>
              <h2>Uma empresa de tecnologia aplicada à inspeção veicular.</h2>
              <p>
                O futuro da Visão Classe A está na integração entre conhecimento
                técnico, atendimento e soluções digitais capazes de gerar mais
                agilidade para clientes e parceiros.
              </p>
            </div>

            <div className={styles.techList}>
              <div>
                <FileSearch size={26} />
                <span>VCA Connect para consulta e compartilhamento de laudos</span>
              </div>
              <div>
                <Smartphone size={26} />
                <span>Consulta Classe A para pesquisa veicular digital</span>
              </div>
              <div>
                <MapPin size={26} />
                <span>Atendimento móvel conectado à operação da empresa</span>
              </div>
              <div>
                <Building2 size={26} />
                <span>Soluções preparadas para concessionárias e parceiros</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.cta}>
            <div>
              <h2>Mais segurança começa com uma avaliação técnica.</h2>
              <p>
                Agende uma vistoria ou fale com nossa equipe sobre uma operação
                para sua empresa.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <Link href="/agendamento" className={styles.primaryButton}>
                Agendar vistoria <ArrowRight size={18} />
              </Link>
              <Link href="/empresas" className={styles.secondaryButton}>
                Soluções para empresas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
