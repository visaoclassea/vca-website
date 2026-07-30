import Image from "next/image";
import Link from "next/link";
export function Footer(){return <footer className="footer"><div className="container"><div className="footer-grid">
<div><Image src="/logo.png" alt="Visão Classe A" width={190} height={70}/><p>Engenharia, tecnologia e segurança aplicadas à inspeção veicular.</p><p>Rua Joaquim Silveira, 1136 — São Sebastião<br/>Porto Alegre/RS — CEP 91060-320</p></div>
<div><h4>Navegação</h4><p><Link href="/servicos">Serviços</Link><br/><Link href="/agendamento">Agendamento</Link><br/><Link href="/sobre">Sobre nós</Link><br/><Link href="/duvidas">Dúvidas</Link></p></div>
<div><h4>Contato</h4><p>(51) 99103-6561<br/>(51) 3276-4435<br/>contato@visaoclassea.com.br<br/>@visaoclassea.oficial</p></div>
</div><div className="footer-bottom">© 2026 FJ Auto Vistorias Veiculares Ltda. — Visão Classe A. Todos os direitos reservados.</div></div></footer>}
