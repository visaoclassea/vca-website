"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CarFront,
  CheckCircle2,
  FileSearch,
  MapPin,
  ScanSearch,
  ShieldCheck,
  Smartphone,
  Wrench,
} from "lucide-react";
import styles from "./home-premium.module.css";

const services = [
  {
    icon: ShieldCheck,
    title: "Vistoria Cautelar",
    text: "Análise técnica de identificação, estrutura, pintura e histórico para comprar ou vender com mais segurança.",
  },
  {
    icon: ScanSearch,
    title: "Pesquisa Veicular",
    text: "Consulta de leilão, sinistro, restrições, roubo e furto, quilometragem e demais apontamentos.",
  },
  {
    icon: Wrench,
    title: "Inspeção Completa",
    text: "Vistoria cautelar combinada com análise mecânica e diagnóstico eletrônico do veículo.",
  },
  {
    icon: CarFront,
    title: "Car Hunter",
    text: "Acompanhamento técnico para localizar, avaliar e apoiar a compra do veículo ideal.",
  },
  {
    icon: Building2,
    title: "Soluções para Empresas",
    text: "Operações sob medida para concessionárias, revendas, leilões, bancos e seguradoras.",
  },
  {
    icon: MapPin,
    title: "Atendimento In Loco",
    text: "Equipe móvel em Porto Alegre, Região Metropolitana e principais cidades do Rio Grande do Sul.",
  },
];

const stats = [
  { value: "+7.000", label: "vistorias realizadas" },
  { value: "20+", label: "anos de experiência" },
  { value: "RS", label: "atendimento nas principais cidades" },
  { value: "100%", label: "laudos digitais" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image
          src="/images/hero.png"
          alt="Unidade da Visão Classe A em Porto Alegre"
          fill
          priority
          className={styles.heroImage}
          sizes="100vw"
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <motion.div
            className={styles.heroCopy}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.7 }}
          >
            <span className={styles.eyebrow}>Engenharia automotiva aplicada</span>
            <h1>
              Tecnologia, precisão e segurança para quem compra ou vende veículos.
            </h1>
            <p>
              Vistorias cautelares, pesquisas veiculares e soluções digitais para
              particulares, lojistas, concessionárias e empresas em todo o Rio
              Grande do Sul.
            </p>

            <div className={styles.heroActions}>
              <Link href="/agendamento" className={styles.primaryButton}>
                Solicitar vistoria <ArrowRight size={18} />
              </Link>

              <Link href="/consulta-classe-a" className={styles.secondaryButton}>
                Consulta Classe A
              </Link>

              <a
                href="https://laudos.visaoclassea.com.br"
                target="_blank"
                rel="noreferrer"
                className={styles.ghostButton}
              >
                Consultar laudo
              </a>
            </div>

            <div className={styles.trustRow}>
              <span>
                <BadgeCheck size={18} /> Processos técnicos padronizados
              </span>
              <span>
                <MapPin size={18} /> Atendimento nas principais cidades do RS
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {stats.map((item, index) => (
              <motion.div
                key={item.label}
                className={styles.stat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrowDark}>Nossos serviços</span>
            <h2>Soluções completas para avaliar veículos com segurança</h2>
            <p>
              Da vistoria individual à operação em grande volume, a Visão Classe A
              combina experiência técnica, processos claros e tecnologia própria.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.title}
                  className={styles.serviceCard}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                >
                  <div className={styles.iconBox}>
                    <Icon size={26} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </motion.article>
              );
            })}
          </div>

          <div className={styles.centerAction}>
            <Link href="/servicos" className={styles.textLink}>
              Conheça todos os serviços <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.aboutSection}>
        <div className={styles.container}>
          <div className={styles.aboutGrid}>
            <motion.div
              className={styles.aboutImageWrap}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="/images/fabricio.png"
                alt="Profissional da Visão Classe A"
                width={1024}
                height={1024}
                className={styles.aboutImage}
                sizes="(max-width: 900px) 100vw, 45vw"
              />
              <div className={styles.aboutBadge}>
                <strong>20+ anos</strong>
                <span>de experiência automotiva</span>
              </div>
            </motion.div>

            <motion.div
              className={styles.aboutCopy}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <span className={styles.eyebrowDark}>Conhecimento técnico</span>
              <h2>Experiência automotiva aliada à tecnologia.</h2>
              <p>
                A Visão Classe A nasceu para elevar o padrão das inspeções
                veiculares. Nossa atuação combina experiência técnica, equipe
                capacitada, processos padronizados e ferramentas digitais que
                tornam cada laudo mais claro, rápido e confiável.
              </p>

              <div className={styles.checkList}>
                <div>
                  <CheckCircle2 size={21} />
                  <span>Atendimento para particulares e empresas</span>
                </div>
                <div>
                  <CheckCircle2 size={21} />
                  <span>Vistoria móvel e atendimento em unidade física</span>
                </div>
                <div>
                  <CheckCircle2 size={21} />
                  <span>Laudos digitais com consulta online</span>
                </div>
              </div>

              <Link href="/sobre" className={styles.primaryButton}>
                Conheça nossa história <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>


      <section className={styles.structureSection}>
        <div className={styles.container}>
          <div className={styles.structureHeading}>
            <div>
              <span className={styles.eyebrowDark}>Nossa estrutura</span>
              <h2>Ambiente preparado para atendimento e inspeção veicular.</h2>
            </div>
            <p>
              Unidade física em Porto Alegre, área técnica organizada e atendimento
              estruturado para clientes particulares, lojistas e empresas.
            </p>
          </div>

          <div className={styles.galleryGrid}>
            <motion.figure
              className={`${styles.galleryItem} ${styles.galleryLarge}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/images/estrutura/area-tecnica.jpeg"
                alt="Área técnica da Visão Classe A"
                fill
                className={styles.galleryImage}
                sizes="(max-width: 760px) 100vw, 66vw"
              />
              <figcaption>
                <strong>Área técnica</strong>
                <span>Espaço organizado para inspeções veiculares.</span>
              </figcaption>
            </motion.figure>

            <motion.figure
              className={styles.galleryItem}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              <Image
                src="/images/estrutura/recepcao.jpeg"
                alt="Recepção da Visão Classe A"
                fill
                className={styles.galleryImage}
                sizes="(max-width: 760px) 100vw, 34vw"
              />
              <figcaption>
                <strong>Recepção</strong>
                <span>Atendimento confortável e profissional.</span>
              </figcaption>
            </motion.figure>

            <motion.figure
              className={styles.galleryItem}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.14 }}
            >
              <Image
                src="/images/estrutura/escritorio.jpeg"
                alt="Escritório da Visão Classe A"
                fill
                className={styles.galleryImage}
                sizes="(max-width: 760px) 100vw, 34vw"
              />
              <figcaption>
                <strong>Escritório</strong>
                <span>Gestão e emissão digital dos laudos.</span>
              </figcaption>
            </motion.figure>

            <motion.figure
              className={`${styles.galleryItem} ${styles.galleryWide}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Image
                src="/images/estrutura/inspecao.png"
                alt="Inspeção veicular realizada pela Visão Classe A"
                fill
                className={styles.galleryImage}
                sizes="(max-width: 760px) 100vw, 66vw"
              />
              <figcaption>
                <strong>Inspeção em prática</strong>
                <span>Procedimentos técnicos aplicados em cada veículo.</span>
              </figcaption>
            </motion.figure>
          </div>
        </div>
      </section>


      <section className={styles.corporateSection}>
        <div className={styles.container}>
          <div className={styles.corporateGrid}>
            <motion.div
              className={styles.corporateCopy}
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55 }}
            >
              <span className={styles.eyebrowDark}>Soluções para empresas</span>
              <h2>Operação técnica preparada para concessionárias e parceiros.</h2>
              <p>
                Atendemos redes de concessionárias, revendas, leilões, bancos,
                seguradoras e empresas que precisam de padronização, agilidade e
                rastreabilidade em suas inspeções veiculares.
              </p>

              <div className={styles.corporateList}>
                <div><CheckCircle2 size={21} /><span>Atendimento em escala e por demanda</span></div>
                <div><CheckCircle2 size={21} /><span>Laudos digitais e compartilhamento online</span></div>
                <div><CheckCircle2 size={21} /><span>Equipe móvel para operações In Loco</span></div>
                <div><CheckCircle2 size={21} /><span>Fluxos personalizados para cada parceiro</span></div>
              </div>

              <Link href="/empresas" className={styles.primaryButton}>
                Conheça as soluções empresariais <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div
              className={styles.corporatePanel}
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55 }}
            >
              <div className={styles.corporatePanelTop}>
                <Building2 size={34} />
                <span>Operação corporativa</span>
              </div>

              <div className={styles.corporateMetrics}>
                <div>
                  <strong>In Loco</strong>
                  <span>Atendimento no pátio ou concessionária</span>
                </div>
                <div>
                  <strong>Digital</strong>
                  <span>Laudos e consultas online</span>
                </div>
                <div>
                  <strong>Escala</strong>
                  <span>Estrutura para maior volume</span>
                </div>
                <div>
                  <strong>RS</strong>
                  <span>Atuação nas principais cidades</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={styles.techSection}>
        <div className={styles.container}>
          <div className={styles.techGrid}>
            <div className={styles.techCopy}>
              <span className={styles.eyebrowLight}>Tecnologia Visão Classe A</span>
              <h2>Informação acessível para decisões mais seguras.</h2>
              <p>
                Unimos inspeção técnica e soluções digitais para oferecer uma
                experiência mais rápida a clientes, lojistas, concessionárias e
                parceiros.
              </p>

              <a
                href="https://laudos.visaoclassea.com.br"
                target="_blank"
                rel="noreferrer"
                className={styles.primaryButton}
              >
                Acessar VCA Connect <ArrowRight size={18} />
              </a>
            </div>

            <div className={styles.techCards}>
              <article>
                <FileSearch size={28} />
                <div>
                  <strong>VCA Connect</strong>
                  <span>Consulta e compartilhamento de laudos online.</span>
                </div>
              </article>

              <article>
                <ScanSearch size={28} />
                <div>
                  <strong>Consulta Classe A</strong>
                  <span>Pesquisa veicular completa em poucos minutos.</span>
                </div>
              </article>

              <article>
                <Smartphone size={28} />
                <div>
                  <strong>Atendimento Digital</strong>
                  <span>Solicitações e acompanhamento pelo celular.</span>
                </div>
              </article>

              <article>
                <BadgeCheck size={28} />
                <div>
                  <strong>Operação em escala</strong>
                  <span>Estrutura preparada para empresas e parceiros.</span>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.cta}>
            <div>
              <span className={styles.eyebrowDark}>Vai comprar ou vender?</span>
              <h2>Conte com uma avaliação técnica antes de decidir.</h2>
              <p>
                Agende uma vistoria em nossa unidade ou solicite atendimento no
                local.
              </p>
            </div>

            <Link href="/agendamento" className={styles.primaryButton}>
              Agendar agora <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
