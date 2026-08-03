import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import styles from "./contato.module.css";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com a Visão Classe A para agendar vistorias, solicitar propostas ou tirar dúvidas sobre nossos serviços.",
};

const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Rua+Joaquim+Silveira+1136+São+Sebastião+Porto+Alegre+RS";

const mapsEmbedUrl =
  "https://www.google.com/maps?q=Rua%20Joaquim%20Silveira%2C%201136%2C%20S%C3%A3o%20Sebasti%C3%A3o%2C%20Porto%20Alegre%2C%20RS&output=embed";

export default function Contato() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.kicker}>Contato</span>

          <h1>Fale com a Visão Classe A</h1>

          <p>
            Solicite uma vistoria, uma proposta comercial ou tire dúvidas sobre
            nossos serviços.
          </p>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <article className={styles.card}>
              <Phone size={27} />

              <h2>Telefones</h2>

              <div className={styles.contactLinks}>
                <a href="tel:+555132764435">(51) 3276-4435</a>
                <a href="tel:+5551991036561">(51) 99103-6561</a>
              </div>
            </article>

            <article className={styles.card}>
              <Mail size={27} />

              <h2>E-mail</h2>

              <div className={styles.contactLinks}>
                <a href="mailto:contato@visaoclassea.com.br">
                  contato@visaoclassea.com.br
                </a>
              </div>
            </article>

            <article className={styles.card}>
              <MapPin size={27} />

              <h2>Endereço</h2>

              <p>
                Rua Joaquim Silveira, 1136
                <br />
                São Sebastião – Porto Alegre/RS
                <br />
                CEP 91060-320
              </p>
            </article>

            <article className={styles.card}>
              <Clock size={27} />

              <h2>Atendimento</h2>

              <p>
                Segunda a sexta
                <br />
                <strong>09h às 18h</strong>
              </p>

              <p>
                Sábado
                <br />
                <strong>09h às 13h</strong>
                <br />
                <span className={styles.appointmentNote}>
                  Somente com agendamento
                </span>
              </p>
            </article>
          </div>

          <div className={styles.locationGrid}>
            <div className={styles.locationContent}>
              <span className={styles.kickerDark}>Nossa unidade</span>

              <h2>Visite a Visão Classe A em Porto Alegre</h2>

              <p>
                Nossa unidade está localizada no bairro São Sebastião, com
                estrutura preparada para atendimento e inspeção veicular.
              </p>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.directionsButton}
              >
                <MapPin size={19} />
                Como chegar
                <ExternalLink size={17} />
              </a>
            </div>

            <div className={styles.mapWrapper}>
              <iframe
                src={mapsEmbedUrl}
                title="Localização da Visão Classe A"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div>
          <span className={styles.kickerDark}>Soluções empresariais</span>

          <h2>Precisa de atendimento para sua empresa?</h2>

          <p>
            Conheça nossas soluções para concessionárias, revendas, leilões,
            bancos, seguradoras e frotas.
          </p>
        </div>

        <Link href="/empresas" className={styles.btn}>
          Conheça nossas soluções
          <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
}
