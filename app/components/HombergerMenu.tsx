import React, { useState } from "react";
import { navLists } from "./navBar/navLists";
import Link from "next/link";
import { Menu, X } from "lucide-react";

function HombergerMenu() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="relative flex items-center justify-center sm:hidden">
      {!toggle && (
        <Menu
          className="h-[25px] w-[25px]"
          onClick={() => setToggle((prev) => !prev)}
        />
      )}
      {toggle && (
        <X
          className="h-[25px] w-[25px]"
          onClick={() => setToggle((prev) => !prev)}
        />
      )}
      {toggle && (
        <ul className="absolute -right-[10px] top-[32px] z-10 flex h-[200px] w-[150px] flex-col items-center justify-between rounded-md bg-slate-800 py-3 text-center font-semibold text-gray-500">
          {navLists?.map((list) => (
            <Link
              key={list.name}
              href={list.path}
              onClick={() => setToggle(false)}
              className="w-[90%] rounded-md px-2 py-1 hover:bg-slate-600"
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
