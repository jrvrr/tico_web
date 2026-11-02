import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tico Web",
  description: "Proyecto web creado con Next.js",
  icons: {
    icon: "/assets/png/ticoCabeza.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
