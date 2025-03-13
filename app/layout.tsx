import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SessionProviderWrapper from "./components/sessionProvider";
import SideMenu from "./dashboard/components/SideMenu";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "The Ethiopian - Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProviderWrapper>
      <html lang="en" suppressHydrationWarning className="scrollbar">
        <body className="scrollbar bodyStyle">
          <main className="flex h-full min-h-screen w-full flex-col items-center justify-between">
            <div className="flex h-full w-full items-start justify-between">
              <div className="sticky left-0 top-0 h-screen w-[80px] overflow-y-auto sm:w-[150px] md:w-[200px]">
                <SideMenu />
              </div>
              <div className="flex h-full min-h-screen flex-1 flex-col">
                <Header />
                <section className="flex w-full flex-1">
                  {children}
                  <ToastContainer position="bottom-right" theme="dark" />
                </section>
                <Footer />
              </div>
            </div>
          </main>
        </body>
      </html>
    </SessionProviderWrapper>
  );
}
