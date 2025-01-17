import React from "react";

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <section className="h-full w-auto flex justify-start items-start rounded-md p-10  bg-slate-900">
      {children}
    </section>
  );
}
