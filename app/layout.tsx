import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "@/components/providers/Providers";

export const metadata: Metadata = {
  title: "Chat Next App",
  description: "Una aplicación de chat web construida con Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-theme="light">
      <body
        className={`antialiased`}
      >
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
