import Image from "next/image";
import Link from "next/link";
import { FileSearch } from "lucide-react";
export function Header(){return <>
<div className="topbar"><div className="container topbar-inner"><span>Porto Alegre e atendimento em todo o Rio Grande do Sul</span><span>(51) 99103-6561 · contato@visaoclassea.com.br</span></div></div>
<header className="header"><div className="container header-inner">
<Link href="/"><Image className="logo" src="/logo.png" alt="Visão Classe A" width={220} height={80} priority /></Link>
<nav className="nav"><Link href="/">Início</Link><Link href="/servicos">Serviços</Link><Link href="/consulta-classe-a">Consulta Classe A</Link><Link href="/agendamento">Agendamento</Link><Link href="/sobre">Sobre</Link><Link href="/duvidas">Dúvidas</Link></nav>
<a className="btn btn-primary" href="https://laudos.visaoclassea.com.br"><FileSearch size={18}/> Consultar laudo</a>
</div></header></>}
