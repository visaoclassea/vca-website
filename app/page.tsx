import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CarFront,
  CheckCircle2,
  FileSearch,
  Gauge,
  MapPin,
  ScanSearch,
  ShieldCheck,
  Smartphone,
  Wrench
} from "lucide-react";

const featured = [
  {
    icon: <ShieldCheck/>,
    title: "Vistoria Cautelar",
    text: "Avaliação técnica de identificação, estrutura, pintura e histórico para comprar ou vender com mais segurança.",
    href: "/servicos"
  },
  {
    icon: <ScanSearch/>,
    title: "Consulta Classe A",
    text: "Pesquisa veicular completa para conhecer restrições, leilão, sinistro, histórico e outros apontamentos.",
    href: "/consulta-classe-a"
  },
  {
    icon: <FileSearch/>,
    title: "VCA Connect",
    text: "Acesse laudos digitais com rapidez, rastreabilidade e uma experiência simples para clientes e parceiros.",
    href: "https://laudos.visaoclassea.com.br"
  }
];

const services = [
  {icon:<ShieldCheck/>,title:"Vistoria Cautelar",text:"Análise técnica de identificação, estrutura, pintura e histórico para decisões mais seguras."},
  {icon:<ScanSearch/>,title:"Pesquisa Veicular",text:"Consulta de bases estaduais e nacionais, leilão, sinistro, restrições, quilometragem e muito mais."},
  {icon:<Wrench/>,title:"Inspeção Completa",text:"Avaliação cautelar combinada com análise mecânica e diagnóstico eletrônico do veículo."},
  {icon:<CarFront/>,title:"Car Hunter",text:"Acompanhamento técnico para localizar, avaliar e apoiar a compra do veículo ideal."},
  {icon:<Building2/>,title:"Soluções para Empresas",text:"Operação sob medida para concessionárias, revendas, leilões, bancos e seguradoras."},
  {icon:<MapPin/>,title:"Atendimento In Loco",text:"Equipe móvel em Porto Alegre, Região Metropolitana e demais regiões do Rio Grande do Sul."}
];

const reasons = [
  "Engenheiro responsável pelos laudos emitidos",
  "Equipe qualificada e procedimentos padronizados",
  "Atendimento móvel para empresas e particulares",
  "Cobertura em Porto Alegre, Região Metropolitana e demais regiões do RS",
  "Laudos e consultas 100% digitais",
  "Soluções preparadas para operações de maior volume"
];

export default function Home(){
  return <main>
    <section className="hero hero-premium">
      <div className="hero-decoration hero-decoration-one" />
      <div className="hero-decoration hero-decoration-two" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">Engenharia automotiva aplicada</div>
          <h1>Inspeções veiculares com tecnologia, precisão e segurança.</h1>
          <p>Vistorias cautelares, pesquisas veiculares e soluções digitais para particulares, lojistas, concessionárias e empresas em todo o Rio Grande do Sul.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary btn-large" href="/agendamento">Solicitar vistoria <ArrowRight size={18}/></Link>
            <Link className="btn btn-glass btn-large" href="/consulta-classe-a">Consulta Classe A</Link>
            <a className="btn btn-ghost btn-large" href="https://laudos.visaoclassea.com.br">Consultar laudo</a>
          </div>
          <div className="hero-trust">
            <span><BadgeCheck size={18}/> Responsabilidade técnica</span>
            <span><MapPin size={18}/> Atendimento em todo RS</span>
          </div>
        </div>
        <div className="visual-panel">
          <div className="visual-badge">Tecnologia própria</div>
          <div className="car-outline">
            <CarFront size={128} strokeWidth={1.15}/>
          </div>
          <div className="visual-panel-copy">
            <strong>Mais segurança em cada decisão</strong>
            <p>Experiência técnica, rastreabilidade e laudos digitais em uma operação preparada para particulares e empresas.</p>
          </div>
          <div className="visual-mini-grid">
            <div><Gauge size={20}/><span>Precisão técnica</span></div>
            <div><Smartphone size={20}/><span>Experiência digital</span></div>
          </div>
        </div>
      </div>
    </section>

    <div className="quickbar">
      <div className="container quickbar-grid">
        <div className="quickitem"><CheckCircle2 size={17}/> Engenheiro responsável</div>
        <div className="quickitem"><CheckCircle2 size={17}/> Atendimento em todo RS</div>
        <div className="quickitem"><CheckCircle2 size={17}/> Vistoria móvel In Loco</div>
        <div className="quickitem"><CheckCircle2 size={17}/> Laudos 100% digitais</div>
      </div>
    </div>

    <section className="section featured-section">
      <div className="container">
        <div className="section-head centered">
          <div className="eyebrow">Acesso rápido</div>
          <h2>As principais soluções da Visão Classe A</h2>
          <p>Escolha o serviço ideal para avaliar um veículo, consultar seu histórico ou acessar um laudo já emitido.</p>
        </div>
        <div className="featured-grid">
          {featured.map((item)=><Link className="featured-card" href={item.href} key={item.title}>
            <div className="featured-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <span>Saiba mais <ArrowRight size={17}/></span>
          </Link>)}
        </div>
      </div>
    </section>

    <section className="section soft">
      <div className="container split-layout">
        <div>
          <div className="eyebrow">Por que escolher a Visão Classe A</div>
          <h2 className="split-title">Segurança respaldada por experiência, engenharia e processos claros.</h2>
          <p className="split-copy">Cada inspeção segue critérios técnicos padronizados e é conduzida por uma equipe preparada para transformar informações complexas em uma decisão mais segura.</p>
          <Link className="text-link" href="/sobre">Conheça nossa empresa <ArrowRight size={17}/></Link>
        </div>
        <div className="reason-list">
          {reasons.map((reason)=><div className="reason-item" key={reason}><CheckCircle2 size={21}/><span>{reason}</span></div>)}
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Nossos serviços</div>
          <h2>Soluções completas para avaliar veículos com segurança</h2>
          <p>Da vistoria individual à operação em grande volume, a Visão Classe A combina experiência técnica e tecnologia própria.</p>
        </div>
        <div className="grid-3">
          {services.map((service)=><article className="card service-card" key={service.title}>
            <div className="icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section className="section technology-section">
      <div className="container technology-grid">
        <div className="technology-copy">
          <div className="eyebrow light">Tecnologia Visão Classe A</div>
          <h2>Uma experiência mais rápida para consultar, compartilhar e acompanhar laudos.</h2>
          <p>O VCA Connect integra o atendimento da Visão Classe A a uma plataforma digital moderna, preparada para clientes, parceiros e operações em escala.</p>
          <a className="btn btn-primary" href="https://laudos.visaoclassea.com.br">Acessar VCA Connect <ArrowRight size={18}/></a>
        </div>
        <div className="technology-cards">
          <div className="tech-card"><FileSearch size={28}/><strong>Consulta rápida</strong><span>Localize laudos em poucos segundos.</span></div>
          <div className="tech-card"><Smartphone size={28}/><strong>Acesso digital</strong><span>Visualização simples no computador ou celular.</span></div>
          <div className="tech-card"><BadgeCheck size={28}/><strong>Rastreabilidade</strong><span>Informações organizadas e disponíveis online.</span></div>
          <div className="tech-card"><Building2 size={28}/><strong>Escala empresarial</strong><span>Estrutura para concessionárias e parceiros.</span></div>
        </div>
      </div>
    </section>

    <section className="section soft">
      <div className="container">
        <div className="section-head centered compact">
          <div className="eyebrow">Estrutura e escala</div>
          <h2>Uma operação preparada para crescer com seus parceiros</h2>
        </div>
        <div className="stats">
          <div className="stat"><strong>+3 anos</strong><span>de mercado</span></div>
          <div className="stat"><strong>320+</strong><span>vistorias por mês</span></div>
          <div className="stat"><strong>22+ anos</strong><span>de experiência técnica</span></div>
          <div className="stat"><strong>RS</strong><span>cobertura estadual</span></div>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="cta premium-cta">
          <div>
            <div className="eyebrow">Vai comprar ou vender um veículo?</div>
            <h2>Conte com uma avaliação técnica antes de tomar sua decisão.</h2>
            <p>Agende uma vistoria em nossa unidade ou solicite atendimento no local.</p>
          </div>
          <Link className="btn btn-primary btn-large" href="/agendamento">Agendar agora <ArrowRight size={18}/></Link>
        </div>
      </div>
    </section>
  </main>
}
