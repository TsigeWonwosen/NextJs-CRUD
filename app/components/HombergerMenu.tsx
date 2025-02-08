import Image from "next/image";
import React, { useState } from "react";
import { navLists } from "./navBar/navLists";
import Link from "next/link";
import { Menu, X } from "lucide-react";

function HombergerMenu() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex justify-center items-center sm:hidden relative ">
      {!toggle && (
        <Menu
          className="w-[25px] h-[25px]"
          onClick={() => setToggle((prev) => !prev)}
        />
      )}
      {toggle && (
        <X
          className="w-[25px] h-[25px]"
          onClick={() => setToggle((prev) => !prev)}
        />
      )}
      {toggle && (
        <ul className="flex justify-between flex-col items-center text-center h-[200px] w-[150px] z-10 absolute top-[32px] -right-[10px] bg-slate-800 rounded-md py-3 text-gray-500 font-semibold">
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
