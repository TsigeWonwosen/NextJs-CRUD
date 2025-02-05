import Image from "next/image";
import React from "react";

function Header({ title, button }: { title: string; button: boolean }) {
  return (
    <section className="flex justify-between ">
      <h1 className="font-semibold text-xl text-slate-400">{title}</h1>
      <Image src="/more.png" width={20} height={20} alt="More" />
    </section>
  );
}

export default Header;
