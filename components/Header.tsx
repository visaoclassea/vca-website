"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import styles from "./Header.module.css";

const links = [
  { href: "/", label: "Início" },
  { href: "/servicos", label: "Serviços" },
  { href: "/empresas", label: "Empresas" },
  { href: "/consulta-classe-a", label: "Consulta Classe A" },
  { href: "/agendamento", label: "Agendamento" },
  { href: "/sobre", label: "Sobre" },
  { href: "/duvidas", label: "Dúvidas" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.topbar}>
        <div className={styles.container}>
          <span>Porto Alegre e atendimento nas principais cidades do RS</span>
          <div className={styles.topContacts}>
            <a href="tel:+555132764435">(51) 3276-4435</a>
            <a href="tel:+5551991036561">(51) 99103-6561</a>
            <a href="mailto:contato@visaoclassea.com.br">
              contato@visaoclassea.com.br
            </a>
          </div>
        </div>
      </div>

      <div className={styles.navbar}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo} onClick={() => setOpen(false)}>
            <Image
              src="/images/logo.png"
              alt="Visão Classe A"
              width={760}
              height={210}
              priority
            />
          </Link>

          <nav className={styles.desktopNav} aria-label="Navegação principal">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          <a
            className={styles.whatsappButton}
            href="https://wa.me/5551991036561"
            target="_blank"
            rel="noreferrer"
          >
            <Phone size={18} />
            <span>WhatsApp</span>
          </a>

          <button
            className={styles.menuButton}
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
      </div>

      {open && (
        <div className={styles.mobileMenu}>
          <nav aria-label="Navegação móvel">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/5551991036561"
              target="_blank"
              rel="noreferrer"
              className={styles.mobileWhatsapp}
              onClick={() => setOpen(false)}
            >
              <Phone size={18} />
              Falar pelo WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
