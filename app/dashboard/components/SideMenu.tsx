import React from "react";
import { menuItems } from "@/app/utils/sideMenu";
import Image from "next/image";
import Link from "next/link";

function SideMenu() {
  const sideMenu = menuItems.map((menu) => (
    <ul key={menu.title} className="text-left">
      <h6 className="text-slate-500 font-normal ">{menu.title}</h6>
      {menu.items.map((item) => (
        <Link href={item.href} key={item.label}>
          <li className="flex justify-left items-center flex-row px-4  py-1 text-left text-slate-500 font-thin rounded hover:bg-slate-700 cursor-pointer hover:text-slate-900 gap-2 ">
            <Image
              src={item.icon}
              alt={item.label}
              width={12}
              height={12}
              className="bg-transparent object-cover overflow-hidden "
            />
            <div className="hidden md:block">{item.label}</div>
          </li>
        </Link>
      ))}
    </ul>
  ));
  return <div className="flex flex-col text-start ">{sideMenu}</div>;
}

export default SideMenu;
