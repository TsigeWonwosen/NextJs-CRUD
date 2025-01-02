import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { SessionProvider } from "next-auth/react";
import SessionProviderWrapper from "./components/sessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Simple Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <SessionProviderWrapper>
          <main className="min-h-screen flex justify-between flex-col text-center h-screen">
            <Header />
            <section className="flex-grow-1 min-h-max px-8">{children}</section>
            <Footer />
          </main>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
