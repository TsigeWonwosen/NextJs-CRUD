import React from "react";
import { menuItems } from "@/app/utils/sideMenu";
import Image from "next/image";
import Link from "next/link";

function SideMenu() {
  return (
    <div className="flex flex-col justify-start lg:justify-center text-sm gap-4">
      {menuItems.map((menu) => (
        <ul key={menu.title} className="text-left ">
          <h6 className="text-slate-500 font-normal mb-3">{menu.title}</h6>
          {menu.items.map((item) => (
            <Link href={item.href} key={item.label}>
              <li className="flex justify-left items-center flex-row px-0  py-1 text-left text-slate-500 font-thin rounded hover:bg-slate-700 cursor-pointer hover:text-slate-900 gap-3 lg:px-4">
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={15}
                  height={15}
                  className="bg-transparent object-cover overflow-hidden "
                />
                <div className="hidden lg:block">{item.label}</div>
              </li>
            </Link>
          ))}
        </ul>
      ))}
    </div>
  );
}

export default SideMenu;
