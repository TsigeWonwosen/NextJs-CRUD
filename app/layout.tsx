import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SessionProviderWrapper from "./components/sessionProvider";
import SideMenu from "./dashboard/components/SideMenu";

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
            <div className="flex justify-between items-start w-full h-full">
              <div className="sticky top-0 left-0 w-[80px] sm:w-[150px] md:w-[200px]  h-screen overflow-y-auto">
                <SideMenu />
              </div>
              <div className="flex flex-col flex-1 h-full min-h-screen ">
                <Header />
                <section className="flex w-full  flex-1">{children}</section>
                <Footer />
              </div>
            </div>
          </main>
        </body>
      </html>
    </SessionProviderWrapper>
  );
}
