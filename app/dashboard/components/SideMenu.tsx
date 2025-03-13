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

  if (role) {
    return (
      <div className="z-20 flex h-full w-full flex-col justify-start gap-2 bg-[#353c56]/10 p-3 text-sm shadow-xl md:px-4 lg:justify-start">
        <section className="flex flex-col gap-2">
          <Link
            href="/dashboard"
            className="justify-left flex w-[80%] items-center hover:text-white"
          >
            <Image
              src="/Logo.jpg"
              width={40}
              height={40}
              alt="The Ethiopian Logo"
              className="h-[35px] w-[35px] rounded-full"
            />
          </Link>
          <section className="flex flex-col gap-[3px]">
            <div className="flex items-center justify-start gap-2">
              <UserCheck size={"10px"} />
              <p className="font-mono text-sm">
                {role && capitalizeTitle(role)}
              </p>
            </div>
            <div className="flex items-center justify-start gap-2">
              <MailCheck size={"10px"} />
              <p className="font-mono text-[10px] text-gray-600">
                {role && session?.user.email}
              </p>
            </div>
          </section>
          <Border direction="b" />
        </section>
        {menuItems.map((menu) => (
          <ul key={menu.title} className="w-full text-left">
            <h6 className="mb-1 hidden text-[12px] font-semibold tracking-wider text-slate-500 md:block">
              {menu.title}
            </h6>
            <Border direction="b" />
            {menu.items.map((item) => {
              if (role && item.visible.includes(role.toLocaleLowerCase())) {
                return (
                  <Link
                    href={item.href}
                    key={item.label}
                    className="m-0 w-full bg-slate-200 p-0"
                  >
                    <li className="justify-left flex w-full cursor-pointer flex-row items-center gap-2 rounded px-0 py-[2.5px] text-left font-thin text-slate-500 hover:bg-slate-700 hover:text-slate-900 lg:px-2 xl:px-4">
                      <Image
                        src={item.icon}
                        alt={item.label}
                        width={12}
                        height={12}
                        className="max-w-fit overflow-hidden rounded-sm bg-slate-400/25 object-cover text-slate-300"
                      />
                      <div className="hidden text-[13px] lg:block">
                        {item.label}
                      </div>
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
