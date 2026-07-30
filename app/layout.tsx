import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.visaoclassea.com.br"),
  title: {
    default: "Visão Classe A | Inspeções Veiculares",
    template: "%s | Visão Classe A",
  },
  description: "Vistoria cautelar, pesquisa veicular e soluções para concessionárias, lojistas e particulares no Rio Grande do Sul.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-17520452776" strategy="afterInteractive" />
        <Script id="google-ads" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17520452776');`}
        </Script>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
