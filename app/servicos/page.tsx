
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Car,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  Gauge,
  MapPin,
  Microscope,
  Paintbrush,
  ScanLine,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Truck,
  Wrench,
  XCircle,
} from "lucide-react";
import styles from "./servicos.module.css";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Conheça os serviços de vistoria cautelar, análise de pintura, pesquisa veicular, diagnóstico eletrônico e atendimento para empresas da Visão Classe A.",
};

const servicos = [
  {
    icon: ShieldCheck,
    titulo: "Vistoria Cautelar Estrutural",
    descricao:
      "Avaliação técnica dos principais pontos de identificação e estrutura do veículo para revelar reparos, substituições e possíveis irregularidades.",
    itens: [
      "Chassi, motor e demais identificadores",
      "Longarinas, colunas e caixas de ar",
      "Painéis dianteiro e traseiro",
      "Assoalho, teto e estrutura da carroceria",
      "Indícios de colisões e reparos estruturais",
    ],
    destaque: true,
  },
  {
    icon: Paintbrush,
    titulo: "Análise de Pintura",
    descricao:
      "Medição técnica da espessura da pintura e inspeção visual para identificar repinturas, correções e intervenções anteriores.",
    itens: [
      "Medição de espessura da pintura",
      "Identificação de repinturas",
      "Indícios de massa e reparos",
      "Diferenças de tonalidade",
      "Avaliação dos principais painéis",
    ],
  },
  {
    icon: FileSearch,
    titulo: "Pesquisa Veicular",
    descricao:
      "Levantamento de informações relevantes em bases veiculares para apoiar uma decisão de compra mais segura e transparente.",
    itens: [
      "Histórico de leilão",
      "Registros de sinistro",
      "Roubo e furto",
      "Restrições e gravames",
      "Dados estaduais e nacionais",
    ],
  },
  {
    icon: ScanLine,
    titulo: "Scanner e Diagnóstico",
    descricao:
      "Leitura eletrônica dos módulos do veículo para identificar falhas registradas e alertas que podem não aparecer em uma avaliação visual.",
    itens: [
      "Leitura de módulos eletrônicos",
      "Falhas de motor e transmissão",
      "Sistemas ABS e airbag",
      "Alertas presentes e históricos",
      "Apoio à avaliação mecânica",
    ],
  },
  {
    icon: Building2,
    titulo: "Soluções para Empresas",
    descricao:
      "Operação estruturada para concessionárias, revendas, leilões, bancos, seguradoras, frotas e empresas do setor automotivo.",
    itens: [
      "Atendimento por volume",
      "Padronização de laudos",
      "Relatórios digitais",
      "Atendimento em diferentes cidades",
      "Soluções personalizadas por operação",
    ],
  },
  {
    icon: MapPin,
    titulo: "Atendimento In Loco",
    descricao:
      "A equipe vai até o local do veículo para realizar a inspeção, reduzindo deslocamentos e facilitando operações particulares ou empresariais.",
    itens: [
      "Residências e empresas",
      "Lojas e concessionárias",
      "Pátios e centros logísticos",
      "Frotas e veículos pesados",
      "Porto Alegre e outras cidades do RS",
    ],
  },
];

const etapas = [
  {
    icon: Smartphone,
    numero: "01",
    titulo: "Agendamento",
    texto: "Você informa o veículo, o serviço desejado e o local do atendimento.",
  },
  {
    icon: Microscope,
    numero: "02",
    titulo: "Inspeção técnica",
    texto: "Nossa equipe realiza a avaliação seguindo critérios técnicos padronizados.",
  },
  {
    icon: FileSearch,
    numero: "03",
    titulo: "Pesquisa veicular",
    texto: "As informações do histórico são analisadas conforme o serviço contratado.",
  },
  {
    icon: ClipboardCheck,
    numero: "04",
    titulo: "Emissão do laudo",
    texto: "Os registros da inspeção são organizados em um documento técnico e objetivo.",
  },
  {
    icon: BadgeCheck,
    numero: "05",
    titulo: "Entrega digital",
    texto: "O resultado é disponibilizado de forma prática para consulta e compartilhamento.",
  },
];

const diferenciais = [
  "Engenheiro responsável pelos laudos emitidos",
  "Equipe treinada e especializada em inspeção veicular",
  "Atendimento para carros, motos, vans e caminhões",
  "Laudos 100% digitais e de fácil compartilhamento",
  "Atendimento móvel para particulares e empresas",
  "Mais de 7.000 vistorias realizadas",
];

export default function ServicosPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <span className={styles.eyebrow}>Serviços Visão Classe A</span>
              <h1>Soluções completas em inspeção veicular.</h1>
              <p>
                Engenharia automotiva, experiência técnica e tecnologia para
                avaliar veículos com mais precisão, transparência e segurança.
              </p>

              <div className={styles.heroActions}>
                <Link href="/agendamento" className={styles.primaryButton}>
                  Agendar vistoria <ArrowRight size={18} />
                </Link>
                <a
                  href="https://wa.me/5551991036561"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.secondaryButton}
                >
                  Falar com a equipe
                </a>
              </div>

              <div className={styles.heroTrust}>
                <span><ShieldCheck size={19} /> Responsabilidade técnica</span>
                <span><Truck size={19} /> Leves e pesados</span>
                <span><MapPin size={19} /> Atendimento no RS</span>
              </div>
            </div>

            <div className={styles.heroPanel}>
              <div className={styles.panelIcon}>
                <Car size={42} />
              </div>
              <span className={styles.panelLabel}>Avaliação técnica</span>
              <h2>Mais informações antes de decidir.</h2>
              <p>
                Uma vistoria bem executada pode revelar reparos estruturais,
                histórico relevante, falhas eletrônicas e outros fatores que
                influenciam diretamente o valor e a segurança da negociação.
              </p>

              <div className={styles.panelStats}>
                <div>
                  <strong>+7.000</strong>
                  <span>vistorias realizadas</span>
                </div>
                <div>
                  <strong>20+</strong>
                  <span>anos de experiência</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.eyebrowDark}>Nossas soluções</span>
              <h2>Escolha o serviço adequado para sua necessidade.</h2>
            </div>
            <p>
              Atendemos desde compradores particulares até operações de alto
              volume em concessionárias, revendas e empresas.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {servicos.map((servico) => {
              const Icon = servico.icon;

              return (
                <article
                  key={servico.titulo}
                  className={`${styles.serviceCard} ${
                    servico.destaque ? styles.serviceFeatured : ""
                  }`}
                >
                  {servico.destaque && (
                    <span className={styles.featuredBadge}>Serviço principal</span>
                  )}

                  <div className={styles.serviceIcon}>
                    <Icon size={28} />
                  </div>

                  <h3>{servico.titulo}</h3>
                  <p>{servico.descricao}</p>

                  <ul>
                    {servico.itens.map((item) => (
                      <li key={item}>
                        <CheckCircle2 size={17} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/agendamento" className={styles.cardLink}>
                    Solicitar atendimento <ArrowRight size={17} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.processSection}>
        <div className={styles.container}>
          <div className={styles.processHeading}>
            <span className={styles.eyebrowLight}>Etapas do atendimento</span>
            <h2>Um processo simples, técnico e transparente.</h2>
          </div>

          <div className={styles.processGrid}>
            {etapas.map((etapa) => {
              const Icon = etapa.icon;

              return (
                <article key={etapa.numero} className={styles.processCard}>
                  <span className={styles.processNumber}>{etapa.numero}</span>
                  <Icon size={28} />
                  <h3>{etapa.titulo}</h3>
                  <p>{etapa.texto}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.differencesSection}>
        <div className={styles.container}>
          <div className={styles.differencesGrid}>
            <div className={styles.differencesContent}>
              <span className={styles.eyebrowDark}>Diferenciais</span>
              <h2>Experiência técnica aplicada a cada veículo.</h2>
              <p>
                A Visão Classe A une conhecimento automotivo, procedimentos
                padronizados e recursos digitais para entregar informações
                claras e confiáveis.
              </p>

              <div className={styles.differencesList}>
                {diferenciais.map((item) => (
                  <div key={item}>
                    <CheckCircle2 size={20} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.differencesVisual}>
              <div className={styles.visualMain}>
                <Gauge size={40} />
                <strong>Precisão técnica</strong>
                <span>Procedimentos definidos para reduzir dúvidas e subjetividade.</span>
              </div>

              <div className={styles.visualGrid}>
                <div>
                  <Wrench size={25} />
                  <strong>Experiência</strong>
                  <span>Conhecimento automotivo aplicado à inspeção.</span>
                </div>
                <div>
                  <ShieldCheck size={25} />
                  <strong>Segurança</strong>
                  <span>Informações para decisões mais conscientes.</span>
                </div>
                <div>
                  <Smartphone size={25} />
                  <strong>Tecnologia</strong>
                  <span>Laudos digitais e atendimento prático.</span>
                </div>
                <div>
                  <Building2 size={25} />
                  <strong>Escala</strong>
                  <span>Estrutura para particulares e empresas.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.comparisonSection}>
        <div className={styles.container}>
          <div className={styles.comparisonHeading}>
            <span className={styles.eyebrowDark}>Por que fazer uma vistoria?</span>
            <h2>Comprar um veículo sem avaliar pode custar muito mais.</h2>
          </div>

          <div className={styles.comparisonGrid}>
            <article className={styles.riskCard}>
              <div className={styles.comparisonIcon}>
                <ShieldAlert size={30} />
              </div>
              <h3>Sem uma avaliação técnica</h3>

              <ul>
                <li><XCircle size={19} /> Compra baseada apenas na aparência</li>
                <li><XCircle size={19} /> Histórico veicular desconhecido</li>
                <li><XCircle size={19} /> Reparos estruturais podem passar despercebidos</li>
                <li><XCircle size={19} /> Maior risco de prejuízo na revenda</li>
              </ul>
            </article>

            <article className={styles.safeCard}>
              <div className={styles.comparisonIcon}>
                <ShieldCheck size={30} />
              </div>
              <h3>Com a Visão Classe A</h3>

              <ul>
                <li><CheckCircle2 size={19} /> Avaliação dos principais pontos estruturais</li>
                <li><CheckCircle2 size={19} /> Pesquisa de informações relevantes</li>
                <li><CheckCircle2 size={19} /> Registro técnico em laudo digital</li>
                <li><CheckCircle2 size={19} /> Mais segurança para negociar e decidir</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.audiencesSection}>
        <div className={styles.container}>
          <div className={styles.audiencesGrid}>
            <div>
              <span className={styles.eyebrowLight}>Quem atendemos</span>
              <h2>Soluções para diferentes perfis e operações.</h2>
            </div>

            <div className={styles.audienceItems}>
              <span><Car size={22} /> Particulares</span>
              <span><Building2 size={22} /> Revendas e concessionárias</span>
              <span><Truck size={22} /> Frotas e transportadoras</span>
              <span><ClipboardCheck size={22} /> Leilões e empresas</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.container}>
          <div className={styles.ctaBox}>
            <div>
              <span className={styles.eyebrowLight}>Visão Classe A</span>
              <h2>Sua próxima negociação merece uma avaliação técnica.</h2>
              <p>
                Agende sua vistoria ou faça uma Consulta Classe A para conhecer
                melhor o veículo antes de fechar negócio.
              </p>
            </div>

            <div className={styles.ctaActions}>
              <Link href="/agendamento" className={styles.ctaPrimary}>
                Agendar vistoria <ArrowRight size={18} />
              </Link>
              <Link href="/consulta-classe-a" className={styles.ctaSecondary}>
                Consulta Classe A
              </Link>
              <a
                href="https://wa.me/5551991036561"
                target="_blank"
                rel="noreferrer"
                className={styles.ctaText}
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
