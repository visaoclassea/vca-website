import type { Metadata } from "next";
import { CheckCircle2, FileSearch, History, ShieldCheck } from "lucide-react";
import PixCheckout from "@/components/PixCheckout";

export const metadata: Metadata = {
  title: "Consulta Classe A | Histórico Veicular",
  description: "Consulte o histórico do veículo e receba as informações pelo WhatsApp. Pagamento rápido e seguro via Pix.",
};

const benefits = [
  "Histórico de leilão e sinistros",
  "Restrições, roubo e furto",
  "Dados estaduais e nacionais",
  "Informações para uma compra mais segura",
];

export default function ConsultaClasseAPage() {
  return (
    <main>
      <section className="page-hero consulta-hero">
        <div className="container consulta-hero-grid">
          <div>
            <span className="eyebrow">Pesquisa veicular</span>
            <h1>Consulta Classe A</h1>
            <p>Conheça o histórico do veículo antes de fechar negócio. Escolha o plano, pague por Pix e receba a consulta no WhatsApp.</p>
            <div className="consulta-benefits">
              {benefits.map((item) => <span key={item}><CheckCircle2 size={18} /> {item}</span>)}
            </div>
          </div>
          <div className="consulta-hero-panel">
            <FileSearch size={52} />
            <strong>Informação para decidir com segurança</strong>
            <p>A pesquisa veicular complementa a vistoria física e ajuda a identificar registros importantes no histórico do veículo.</p>
          </div>
        </div>
      </section>

      <section className="section consulta-plans-section">
        <div className="container">
          <div className="section-head centered">
            <span className="eyebrow">Escolha sua consulta</span>
            <h2>Três opções para diferentes necessidades</h2>
            <p>Os nomes e valores abaixo foram preservados exatamente como no sistema Pix atual.</p>
          </div>
          <div className="consulta-plans-grid">
            <article className="consulta-plan-card">
              <History size={28} />
              <span>Plus</span><strong>R$ 49,90</strong>
              <p>Uma opção objetiva para verificar informações essenciais antes da negociação.</p>
            </article>
            <article className="consulta-plan-card featured">
              <div className="plan-badge">Mais procurada</div>
              <ShieldCheck size={28} />
              <span>Gold</span><strong>R$ 57,90</strong>
              <p>Mais amplitude de informações para quem deseja avaliar o histórico com maior segurança.</p>
            </article>
            <article className="consulta-plan-card">
              <FileSearch size={28} />
              <span>Completa</span><strong>R$ 64,90</strong>
              <p>A alternativa mais abrangente disponível na Consulta Classe A.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section soft" id="pagamento">
        <div className="container">
          <div className="section-head compact">
            <span className="eyebrow">Solicitação online</span>
            <h2>Preencha os dados e gere o Pix</h2>
            <p>A integração mantém os mesmos serviços, valores, QR Code, Pix copia e cola e verificação automática de pagamento do sistema atual.</p>
          </div>
          <PixCheckout />
        </div>
      </section>
    </main>
  );
}
