import React from "react";

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <section className="h-full w-full justify-start min-h-screen flex  items-center flex-col gap-6 md:gap-4 rounded-md p-4 md:border border-spacing-x-1 border-slate-700/50">
      {children}
    </section>
  );
}
