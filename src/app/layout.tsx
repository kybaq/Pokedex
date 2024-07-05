import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/Provider";

export const metadata: Metadata = {
  title: "Pokédex",
  description: "Pokemon index about oldie pokemons (1th Gen)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
