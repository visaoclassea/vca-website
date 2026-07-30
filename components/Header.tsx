import Image from "next/image";
import Link from "next/link";
import { FileSearch, Menu, Phone } from "lucide-react";

export function Header(){
  return <>
    <div className="topbar">
      <div className="container topbar-inner">
        <span>Porto Alegre e atendimento em todo o Rio Grande do Sul</span>
        <span className="topbar-contacts">
          <a href="tel:+555132764435"><Phone size={13}/> (51) 3276-4435</a>
          <span>·</span>
          <a href="tel:+5551991036561">(51) 99103-6561</a>
          <span>·</span>
          <a href="mailto:contato@visaoclassea.com.br">contato@visaoclassea.com.br</a>
        </span>
      </div>
    </div>
    <header className="header">
      <div className="container header-inner">
        <Link href="/" aria-label="Página inicial">
          <Image className="logo" src="/logo.png" alt="Visão Classe A" width={220} height={80} priority />
        </Link>
        <nav className="nav" aria-label="Navegação principal">
          <Link href="/">Início</Link>
          <Link href="/servicos">Serviços</Link>
          <Link href="/consulta-classe-a">Consulta Classe A</Link>
          <Link href="/agendamento">Agendamento</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/duvidas">Dúvidas</Link>
        </nav>
        <a className="btn btn-primary header-cta" href="https://laudos.visaoclassea.com.br">
          <FileSearch size={18}/> Consultar laudo
        </a>
        <span className="mobile-menu-icon" aria-hidden="true"><Menu size={25}/></span>
      </div>
    </header>
  </>
}
