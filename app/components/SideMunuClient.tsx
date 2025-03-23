"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { AlignLeft, ChevronLeft } from "lucide-react";
import MenuWithLogo from "./MenuWithLogo";
import { toggleSideMenu } from "../reduxStore/sideMenuSlice";
import { RootState } from "@/app/reduxStore/store";
import Border from "../dashboard/components/border";
import { menuItems } from "../utils/sideMenu";
import Image from "next/image";
import Link from "next/link";

function SideMunuClient({ role, email }: { role: string; email: string }) {
  const dispatch = useDispatch();
  const isSideMenuOpen = useSelector(
    (state: RootState) => state.sideMenu.isSideMenuOpen,
  );

  return (
    <>
      <div className="hidden h-full bg-light-bgw dark:bg-dark-bg md:block">
        <MenuWithLogo role={role} email={email} />
      </div>

      <div className="block h-full w-auto md:hidden">
        {!isSideMenuOpen ? (
          <div className="z-20 flex h-full w-[60px] flex-col justify-start bg-light-bgw text-sm shadow-xl dark:bg-[#353c56]/10 lg:hidden">
            <section className="flex h-full flex-col items-center justify-start py-2">
              <section className="mb-8 flex h-[50px] items-center justify-center">
                <button onClick={() => dispatch(toggleSideMenu())}>
                  <AlignLeft className="h-[24px] w-[24px] text-light-button dark:text-dark-button" />
                </button>
              </section>
              {menuItems.map((menu) => (
                <ul
                  key={menu.title}
                  className={`font-['apple-system,_system-ui,_BlinkMacSystemFont,_"Segoe_UI",_Roboto,_"Helvetica_Neue",_"Fira_Sans",_Ubuntu,_Oxygen,_"Oxygen_Sans",_Cantarell,_"Droid_Sans",_"Apple_Color_Emoji",_"Segoe_UI_Emoji",_"Segoe_UI_Symbol",_"Lucida_Grande",_Helvetica,_Arial,_sans-serif'], w-full text-left`}
                >
                  <h6 className="mb-1 text-center text-[8px] font-semibold text-slate-600">
                    {menu.title}
                  </h6>
                  <Border direction="b" />
                  {menu.items.map((item) => {
                    if (
                      role &&
                      item.visible.includes(role.toLocaleLowerCase())
                    ) {
                      return (
                        <Link
                          href={item.href}
                          key={item.label}
                          className="w-full bg-slate-200 p-0"
                        >
                          <li
                            className={`mb-1 flex h-5 w-full cursor-pointer flex-col items-center justify-center rounded-sm px-1 py-[2.5px] text-left font-['apple-system,_system-ui,_BlinkMacSystemFont,_"Segoe_UI",_Roboto,_"Helvetica_Neue",_"Fira_Sans",_Ubuntu,_Oxygen,_"Oxygen_Sans",_Cantarell,_"Droid_Sans",_"Apple_Color_Emoji",_"Segoe_UI_Emoji",_"Segoe_UI_Symbol",_"Lucida_Grande",_Helvetica,_Arial,_sans-serif'] font-thin transition-all duration-500 hover:bg-light-primary/70 hover:text-light-bgw dark:hover:bg-dark-primary/70 dark:hover:text-dark-text lg:px-2 xl:px-4`}
                          >
                            <Image
                              src={item.icon}
                              alt={item.label}
                              width={15}
                              height={15}
                              className="max-w-fit overflow-hidden rounded-sm bg-light-text object-cover dark:bg-dark-text"
                            />
                          </li>
                        </Link>
                      );
                    }
                  })}
                </ul>
              ))}
            </section>
          </div>
        ) : (
          <div className="relative h-full w-auto bg-[#353c56]/10">
            <button
              onClick={() => dispatch(toggleSideMenu())}
              className="absolute -left-3 top-4 flex w-full justify-end"
            >
              <ChevronLeft className="h-[24px] w-[24px] text-light-button dark:text-dark-button" />
            </button>
            <MenuWithLogo role={role} email={email} />
          </div>
        )}
      </div>
    </>
  );
}

export default SideMunuClient;
