import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.mainGrid}>
          <div className={styles.brand}>
            <Image
              src="/images/logo.png"
              alt="Visão Classe A"
              width={760}
              height={210}
            />
            <p>
              Engenharia, tecnologia e segurança aplicadas à inspeção veicular.
            </p>
            <span>
              Atendimento para particulares, lojistas, concessionárias e
              empresas.
            </span>
          </div>

          <div className={styles.column}>
            <h3>Navegação</h3>
            <Link href="/">Início</Link>
            <Link href="/servicos">Serviços</Link>
            <Link href="/agendamento">Agendamento</Link>
            <Link href="/sobre">Sobre nós</Link>
            <Link href="/duvidas">Dúvidas</Link>
          </div>

          <div className={styles.column}>
            <h3>Soluções digitais</h3>
            <Link href="/consulta-classe-a">Consulta Classe A</Link>
            <a
              href="https://laudos.visaoclassea.com.br"
              target="_blank"
              rel="noreferrer"
            >
              Consultar laudo
            </a>
            <Link href="/servicos">Vistoria cautelar</Link>
            <Link href="/servicos">Atendimento In Loco</Link>
          </div>

          <div className={styles.contact}>
            <h3>Contato</h3>

            <a href="tel:+555132764435">
              <Phone size={18} />
              (51) 3276-4435
            </a>

            <a href="tel:+5551991036561">
              <Phone size={18} />
              (51) 99103-6561
            </a>

            <a href="mailto:contato@visaoclassea.com.br">
              <Mail size={18} />
              contato@visaoclassea.com.br
            </a>

            <a
              href="https://www.instagram.com/visaoclassea.oficial/"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram size={18} />
              @visaoclassea.oficial
            </a>

            <div>
              <MapPin size={18} />
              <span>
                Rua Joaquim Silveira, 1136
                <br />
                São Sebastião — Porto Alegre/RS
              </span>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>
            © {new Date().getFullYear()} FJ Auto Vistorias Veiculares Ltda. —
            Visão Classe A.
          </span>
          <span>Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
