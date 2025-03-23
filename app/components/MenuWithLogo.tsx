"use client";
import { menuItems } from "@/app/utils/sideMenu";
import Image from "next/image";
import Link from "next/link";

import { capitalizeTitle } from "@/app/utils/capitalize";
import { MailCheck, UserCheck } from "lucide-react";
import Border from "../dashboard/components/border";
import { usePathname } from "next/navigation";

function MenuWithLogo({ role, email }: { role: string; email: string }) {
  const pathName = usePathname();

  return (
    <div className="z-20 flex h-full w-auto flex-col justify-start gap-2 bg-light-bgw p-3 text-sm shadow-xl dark:bg-[#353c56]/10 md:px-4 lg:flex lg:justify-start">
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
            <p className="font-mono text-sm">{role && capitalizeTitle(role)}</p>
          </div>
          <div className="flex items-center justify-start gap-2">
            <MailCheck size={"10px"} />
            <p className="font-mono text-[10px] text-gray-600">
              {role && email}
            </p>
          </div>
        </section>
        <Border direction="b" />
      </section>
      {menuItems.map((menu) => (
        <ul
          key={menu.title}
          className={`font-['apple-system,_system-ui,_BlinkMacSystemFont,_"Segoe_UI",_Roboto,_"Helvetica_Neue",_"Fira_Sans",_Ubuntu,_Oxygen,_"Oxygen_Sans",_Cantarell,_"Droid_Sans",_"Apple_Color_Emoji",_"Segoe_UI_Emoji",_"Segoe_UI_Symbol",_"Lucida_Grande",_Helvetica,_Arial,_sans-serif'], w-full text-left`}
        >
          <h6 className="mb-1 text-[12px] font-semibold tracking-wider text-slate-600">
            {menu.title}
          </h6>
          <Border direction="b" />
          {menu.items.map((item) => {
            if (role && item.visible.includes(role.toLocaleLowerCase())) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="w-full bg-slate-200 p-0"
                  // transition-all duration-500 hover:bg-light-primary/90
                >
                  <li
                    className={`justify-left m-[1px] flex w-[90%] cursor-pointer flex-row items-center gap-2 rounded-sm px-1 py-[2.4px] text-left font-['apple-system,_system-ui,_BlinkMacSystemFont,_"Segoe_UI",_Roboto,_"Helvetica_Neue",_"Fira_Sans",_Ubuntu,_Oxygen,_"Oxygen_Sans",_Cantarell,_"Droid_Sans",_"Apple_Color_Emoji",_"Segoe_UI_Emoji",_"Segoe_UI_Symbol",_"Lucida_Grande",_Helvetica,_Arial,_sans-serif'] font-thin transition-all duration-500 hover:bg-light-primary/70 hover:text-light-bgw dark:hover:bg-dark-primary/70 dark:hover:text-dark-text lg:px-2 xl:px-4 ${pathName === item.href ? "bg-light-primary text-light-bgw dark:bg-dark-primary dark:text-dark-text" : ""}`}
                  >
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={12}
                      height={12}
                      className="max-w-fit overflow-hidden rounded-sm bg-light-text object-cover dark:bg-dark-text"
                    />
                    <div className="text-[13px]">{item.label}</div>
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

export default MenuWithLogo;
