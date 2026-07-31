import Link from "next/link";
import styles from "./FinalCTA.module.css";
export function FinalCTA(){
return <section className={styles.cta}><div className={styles.box}><h2>Sua próxima negociação merece uma avaliação técnica.</h2><p>Conte com a Visão Classe A para realizar uma vistoria ou consulta veicular com segurança.</p><div className={styles.actions}><Link href="/agendamento">Agendar Vistoria</Link><Link href="/consulta-classe-a">Consulta Classe A</Link><a href="https://wa.me/5551991036561">WhatsApp</a></div></div></section>
}