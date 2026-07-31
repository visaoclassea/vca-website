import Link from "next/link";
import {Mail,MapPin,Phone,Clock,ArrowRight} from "lucide-react";
import styles from "./contato.module.css";

export default function Contato(){
return <main className={styles.page}>
<section className={styles.hero}>
<div className={styles.container}>
<span className={styles.kicker}>Contato</span>
<h1>Fale com a Visão Classe A</h1>
<p>Solicite uma vistoria, uma proposta comercial ou tire dúvidas sobre nossos serviços.</p>
</div>
</section>
<section className={styles.grid}>
<div className={styles.card}>
<Phone/><h3>Telefones</h3>
<p>(51) 3276-4435<br/>(51) 99103-6561</p>
</div>
<div className={styles.card}>
<Mail/><h3>E-mail</h3>
<p>contato@visaoclassea.com.br</p>
</div>
<div className={styles.card}>
<MapPin/><h3>Endereço</h3>
<p>Rua Joaquim Silveira, 1136<br/>São Sebastião - Porto Alegre/RS</p>
</div>
<div className={styles.card}>
<Clock/><h3>Atendimento</h3>
<p>Segunda a Sexta<br/>08h às 18h</p>
</div>
</section>
<section className={styles.cta}>
<h2>Precisa de atendimento empresarial?</h2>
<Link href="/empresas" className={styles.btn}>Conheça nossas soluções <ArrowRight size={18}/></Link>
</section>
</main>}