import styles from "./duvidas.module.css";
const faqs=[
["O que é a vistoria cautelar?","Avaliação técnica da identificação, estrutura, pintura e histórico do veículo."],
["Atendem empresas?","Sim. Concessionárias, revendas, leilões, bancos e seguradoras."],
["Existe atendimento In Loco?","Sim, conforme disponibilidade e região."],
["Como recebo o laudo?","Digitalmente através do VCA Connect."]
];
export default function Duvidas(){return <main className={styles.page}><section className={styles.hero}><h1>Perguntas Frequentes</h1></section><section className={styles.wrap}>{faqs.map(([q,a])=><details key={q} className={styles.item}><summary>{q}</summary><p>{a}</p></details>)}</section></main>}