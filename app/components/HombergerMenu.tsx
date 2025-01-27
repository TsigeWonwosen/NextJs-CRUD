import Image from "next/image";
import React, { useState } from "react";
import { navLists } from "./navBar/navLists";
import Link from "next/link";

function HombergerMenu() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex justify-center items-center sm:hidden relative w-[30px] h-[30px] mr-5">
      <Image
        src={`/main-menu.png`}
        width={20}
        height={20}
        alt="Menu"
        onClick={() => setToggle((prev) => !prev)}
      />{" "}
      {toggle && (
        <ul className="flex justify-between flex-col items-center h-[150px] w-[150px] z-10 absolute top-[32px] -right-[50px] bg-slate-800 rounded-md py-3 text-gray-500 font-semibold">
          {navLists?.map((list) => (
            <Link
              key={list.name}
              href={list.path}
              onClick={() => setToggle(false)}
              className="hover:bg-slate-600 w-[90%] px-2 py-1 rounded-md "
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
