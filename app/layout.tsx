import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
export const metadata: Metadata={metadataBase:new URL("https://www.visaoclassea.com.br"),title:{default:"Visão Classe A | Inspeções Veiculares",template:"%s | Visão Classe A"},description:"Vistoria cautelar, pesquisa veicular e soluções para concessionárias, lojistas e particulares no Rio Grande do Sul."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body><Header/>{children}<Footer/></body></html>}
