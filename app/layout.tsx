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
    <html lang="en" suppressHydrationWarning className="h-full w-full">
      <SessionProviderWrapper>
        <body className="h-full w-full">
          <main className="flex justify-between flex-col text-center items-center h-full w-full">
            <Header />
            <section className="w-full  px-3 md:px-5  flex-grow ">
              {children}
            </section>
            <Footer />
          </main>
        </body>
      </SessionProviderWrapper>
    </html>
  );
}
