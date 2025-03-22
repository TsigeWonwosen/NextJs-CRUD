"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { AlignLeft, ChevronLeft } from "lucide-react";
import MenuWithLogo from "./MenuWithLogo";
import { toggleSideMenu } from "../reduxStore/sideMenuSlice";
import { RootState } from "@/app/reduxStore/store";

function SideMunuClient({ role, email }: { role: string; email: string }) {
  const dispatch = useDispatch();
  const isSideMenuOpen = useSelector(
    (state: RootState) => state.sideMenu.isSideMenuOpen,
  );

  return (
    <>
      <div className="bg-light-bgw dark:bg-dark-bg hidden h-full md:block">
        <MenuWithLogo role={role} email={email} />
      </div>

      <div className="block h-full w-auto md:hidden">
        {!isSideMenuOpen ? (
          <div className="bg-light-bgw z-20 flex h-full w-[60px] flex-col justify-start text-sm shadow-xl dark:bg-[#353c56]/10 lg:hidden">
            <section className="flex h-[50px] items-center justify-center py-8">
              <button onClick={() => dispatch(toggleSideMenu())}>
                <AlignLeft className="text-light-button dark:text-dark-button h-[24px] w-[24px]" />
              </button>
            </section>
          </div>
        ) : (
          <div className="relative h-full w-auto bg-[#353c56]/10">
            <button
              onClick={() => dispatch(toggleSideMenu())}
              className="absolute -left-3 top-4 flex w-full justify-end"
            >
              <ChevronLeft className="text-light-button dark:text-dark-button h-[24px] w-[24px]" />
            </button>
            <MenuWithLogo role={role} email={email} />
          </div>
        )}
      </div>
    </>
  );
}

export default SideMunuClient;
