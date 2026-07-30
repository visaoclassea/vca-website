import Link from "next/link";
import {
  ArrowRight,
  Bike,
  Building2,
  CarFront,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  MapPin,
  ScanLine,
  SearchCheck,
  ShieldCheck,
  Truck,
  Wrench
} from "lucide-react";

export const metadata = {
  title: "Serviços | Visão Classe A",
  description: "Vistoria cautelar, pesquisa veicular, inspeção completa, Car Hunter e soluções para empresas em Porto Alegre e todo o Rio Grande do Sul."
};

const services = [
  {
    icon: ShieldCheck,
    title: "Vistoria Cautelar",
    text: "Avaliação técnica de identificação, originalidade, estrutura, pintura e histórico do veículo para reduzir riscos antes da compra, venda ou recebimento em estoque.",
    items: ["Identificação de chassi, motor e gravações", "Análise de longarinas, colunas, painéis e assoalho", "Verificação de reparos estruturais e pintura", "Pesquisa veicular integrada ao laudo"]
  },
  {
    icon: SearchCheck,
    title: "Pesquisa Veicular Completa",
    text: "Consulta de informações estaduais e nacionais para conhecer o histórico do veículo antes de fechar negócio.",
    items: ["Restrições e gravames", "Histórico de leilão e sinistro", "Roubo e furto", "Quilometragem e demais apontamentos disponíveis"]
  },
  {
    icon: Wrench,
    title: "Vistoria Completa",
    text: "Combina a análise cautelar com avaliação mecânica e diagnóstico eletrônico, oferecendo uma visão mais ampla das condições do veículo.",
    items: ["Vistoria cautelar estrutural", "Análise mecânica", "Scanner eletrônico", "Relatório técnico digital"]
  },
  {
    icon: CarFront,
    title: "Car Hunter",
    text: "Acompanhamento técnico para quem deseja encontrar e comprar um veículo com mais segurança, reduzindo o risco de uma escolha inadequada.",
    items: ["Apoio na seleção do veículo", "Avaliação técnica antes da compra", "Análise de histórico", "Orientação para tomada de decisão"]
  },
  {
    icon: Truck,
    title: "Caminhões, Vans e Pesados",
    text: "Inspeções adaptadas às características de veículos pesados, comerciais e de transporte.",
    items: ["Identificação veicular", "Análise estrutural", "Pesquisa de histórico", "Atendimento em pátios e empresas"]
  },
  {
    icon: Bike,
    title: "Vistoria de Motos",
    text: "Avaliação de identificação, estrutura e histórico para motocicletas, com atendimento para particulares, lojas e concessionárias.",
    items: ["Chassi e motor", "Sinais identificadores", "Estrutura e componentes", "Pesquisa veicular"]
  }
];

const businessSolutions = [
  { icon: Building2, title: "Concessionárias e revendas", text: "Operações padronizadas para entrada de estoque, seminovos, repasse e apoio à comercialização." },
  { icon: ClipboardCheck, title: "Leilões, bancos e seguradoras", text: "Inspeções técnicas e pesquisas para decisões, regularização e análise de ativos." },
  { icon: MapPin, title: "Atendimento In Loco", text: "Equipe móvel em Porto Alegre, Região Metropolitana e demais regiões do Rio Grande do Sul." },
  { icon: FileSearch, title: "Laudos digitais", text: "Acesso rápido, compartilhamento e rastreabilidade por meio do VCA Connect." }
];

export default function ServicosPage(){
  return <main>
    <section className="page-hero service-page-hero">
      <div className="container service-hero-grid">
        <div>
          <div className="eyebrow">Soluções técnicas automotivas</div>
          <h1>Serviços para avaliar veículos com mais segurança.</h1>
          <p>Da vistoria individual à operação de grandes grupos, a Visão Classe A combina experiência técnica, engenharia responsável e tecnologia própria.</p>
          <div className="hero-actions dark-actions">
            <Link className="btn btn-primary" href="/agendamento">Solicitar vistoria <ArrowRight size={18}/></Link>
            <Link className="btn btn-light" href="/contato">Falar com nossa equipe</Link>
          </div>
        </div>
        <div className="service-hero-card">
          <ScanLine size={52}/>
          <strong>Atendimento para particulares e empresas</strong>
          <p>Carros, motos, vans, caminhões e operações em pátios, lojas e concessionárias.</p>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="section-head centered">
          <div className="eyebrow">Portfólio de serviços</div>
          <h2>Escolha a avaliação adequada para cada necessidade</h2>
          <p>Todos os serviços são conduzidos com critérios técnicos padronizados e informações apresentadas de forma clara no laudo.</p>
        </div>
        <div className="services-detail-grid">
          {services.map(({icon: Icon,title,text,items}) => <article className="service-detail-card" key={title}>
            <div className="service-detail-top">
              <div className="icon"><Icon/></div>
              <h3>{title}</h3>
            </div>
            <p>{text}</p>
            <ul>
              {items.map(item => <li key={item}><CheckCircle2 size={18}/><span>{item}</span></li>)}
            </ul>
          </article>)}
        </div>
      </div>
    </section>

    <section className="section soft">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Soluções empresariais</div>
          <h2>Estrutura preparada para operações de maior volume</h2>
          <p>Atendimento sob medida para redes de concessionárias, lojistas, leilões, bancos, seguradoras e empresas do setor automotivo.</p>
        </div>
        <div className="business-grid">
          {businessSolutions.map(({icon: Icon,title,text}) => <article className="business-card" key={title}>
            <Icon size={26}/>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section className="section service-process-section">
      <div className="container split-layout service-process-grid">
        <div>
          <div className="eyebrow">Como funciona</div>
          <h2 className="split-title">Um processo simples, técnico e transparente</h2>
          <p className="split-copy">Nossa equipe organiza cada etapa para que você receba informações confiáveis e consiga tomar sua decisão com mais tranquilidade.</p>
        </div>
        <div className="process-list">
          <div><span>1</span><strong>Solicitação</strong><p>Você informa o veículo, local e serviço necessário.</p></div>
          <div><span>2</span><strong>Inspeção</strong><p>Realizamos a avaliação conforme o escopo contratado.</p></div>
          <div><span>3</span><strong>Laudo digital</strong><p>O resultado é disponibilizado de forma organizada e acessível.</p></div>
          <div><span>4</span><strong>Decisão segura</strong><p>Você utiliza as informações para negociar com mais segurança.</p></div>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="cta premium-cta">
          <div>
            <div className="eyebrow">Precisa avaliar um veículo?</div>
            <h2>Solicite uma vistoria ou fale com nossa equipe comercial.</h2>
            <p>Atendimento em nossa unidade e também no local, conforme disponibilidade e região.</p>
          </div>
          <Link className="btn btn-primary btn-large" href="/agendamento">Agendar vistoria <ArrowRight size={18}/></Link>
        </div>
      </div>
    </section>
  </main>
}
