import Image from "next/image";
import React, { useState } from "react";
import { navLists } from "./navBar/navLists";
import Link from "next/link";

function HombergerMenu() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex justify-center items-center sm:hidden relative">
      <Image
        src={`/main-menu.png`}
        width={20}
        height={20}
        alt="Menu"
        onClick={() => setToggle((prev) => !prev)}
      />{" "}
      {toggle && (
        <ul className="flex justify-between flex-col items-center h-[150px] w-[150px] z-10 absolute top-11 -left-38 bg-slate-800 rounded-md py-3">
          {navLists?.map((list) => (
            <Link
              key={list.name}
              href={list.path}
              onClick={() => setToggle(false)}
            >
              {list.name}{" "}
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HombergerMenu;
