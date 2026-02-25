import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "@/components/providers/Providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://chat-next-two.vercel.app"),

  title: "Chat Next",
  description: "Unete a chat next para conocer miles de grupos creados por la comunidad. Busca contenido de tu interes y disfruta.",

  alternates: {
    canonical: "https://chat-next-two.vercel.app",
  },

  openGraph: {
    title: "Chat Next",
    description: "Unete a chat next para conocer miles de grupos creados por la comunidad. Busca contenido de tu interes y disfruta.",
    url: "https://chat-next-two.vercel.app",
    siteName: "Mi Sitio",
    images: [
      {
        url: "/logo-app.png",
        width: 1200,
        height: 630,
        alt: "logo aplicattion",
      },
    ],
    locale: "es_AR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Chat Next",
    description: "Unete a chat next para conocer miles de grupos creados por la comunidad. Busca contenido de tu interes y disfruta.",
    images: ["/logo-app.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-theme="light">
      <body className={`antialiased`}>
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
