import React from "react";
import { menuItems } from "@/app/utils/sideMenu";
import Image from "next/image";
import Link from "next/link";
import { Options } from "@/app/libs/auth";
import { getServerSession } from "next-auth";
import Border from "./border";
import { capitalizeTitle } from "@/app/utils/capitalize";
import { MailCheck, UserCheck } from "lucide-react";

async function SideMenu() {
  const session = await getServerSession(Options);
  const role = session?.user.role ? session?.user.role : "Admin";

  if (session?.user) {
    return (
      <div className="h-full w-full flex flex-col justify-start lg:justify-start text-sm gap-3 bg-[#353c56]/10  p-3  md:px-4 shadow-xl z-20">
        <section className="flex flex-col gap-2">
          <Link
            href="/dashboard"
            className="hover:text-white flex items-center justify-center w-[80%]"
          >
            <Image
              src="/Logo.jpg"
              width={40}
              height={40}
              alt="The Ethiopian Logo"
              className="rounded-full"
            />
          </Link>
          <section>
            <div className="flex gap-2 justify-start items-center">
              <UserCheck size={"14px"} />
              <p className="text-sm font-semibold">
                {session && capitalizeTitle(role)}
              </p>
            </div>
            <div className="flex gap-2 justify-start items-center">
              <MailCheck size={"14px"} />
              <p className="text-xs font-semibold">
                {session && session?.user.email}
              </p>
            </div>
          </section>
          <Border direction="b" />
        </section>
        {menuItems.map((menu) => (
          <ul key={menu.title} className="text-left w-full ">
            <h6 className=" hidden md:block text-slate-500 font-normal mb-3 tracking-wider">
              {menu.title}
            </h6>
            <Border direction="b" />
            {menu.items.map((item) => {
              if (role && item.visible.includes(role.toLocaleLowerCase())) {
                return (
                  <Link href={item.href} key={item.label} className="w-full">
                    <li className="flex justify-left items-center flex-row px-0  py-1 text-left text-slate-500 font-thin rounded hover:bg-slate-700 cursor-pointer hover:text-slate-900 gap-3 lg:px-2 xl:px-4 w-full">
                      <Image
                        src={item.icon}
                        alt={item.label}
                        width={15}
                        height={15}
                        className="bg-slate-400/25 object-cover overflow-hidden text-slate-300 max-w-fit rounded-sm"
                      />
                      <div className="hidden lg:block">{item.label}</div>
                    </li>
                  </Link>
                );
              }
            })}
          </ul>
        ))}
      </div>
    );
  }
}

export default SideMenu;
