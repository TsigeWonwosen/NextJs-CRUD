import React from "react";

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex h-full min-h-screen w-full border-spacing-x-1 flex-col items-center justify-start gap-8 rounded-md border-slate-700/50 bg-light-bgw p-4 dark:bg-dark-bg md:gap-4 md:border">
      {children}
    </section>
  );
}
