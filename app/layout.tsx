import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
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
    <SessionProviderWrapper>
      <html lang="en" suppressHydrationWarning>
        <body className="bodyStyle">
          <main className="flex justify-between flex-col items-center h-full w-full min-h-screen">
            <Header />
            <section className="w-full px-3 md:px-5  flex-10">
              {children}
            </section>
            <Footer />
          </main>
        </body>
      </html>
    </SessionProviderWrapper>
  );
}
