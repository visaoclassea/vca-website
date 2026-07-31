"use client";
import Link from "next/link";
import {MessageCircle,CalendarDays,Search} from "lucide-react";
import styles from "./FloatingActions.module.css";
export function FloatingActions(){
return(
<div className={styles.wrap}>
<a href="https://wa.me/5551991036561" target="_blank"><MessageCircle size={20}/><span>WhatsApp</span></a>
<Link href="/agendamento"><CalendarDays size={20}/><span>Agendar</span></Link>
<Link href="/consulta-classe-a"><Search size={20}/><span>Consulta</span></Link>
</div>
)}