import React from "react";

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <section className="h-full w-full justify-evenly min-h-screen flex  items-center flex-col gap-3 rounded-md p-4 bg-slate-900">
      {children}
    </section>
  );
}
