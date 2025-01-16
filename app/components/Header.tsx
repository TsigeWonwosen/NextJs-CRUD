"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { navLists } from "./navBar/navLists";
import Links from "./navBar/Links";
import { useSession } from "next-auth/react";
import LogoutForm from "./LogoutForm";
import Image from "next/image";
import { StaffType } from "../libs/types";
import UserMenu from "./UserMenu";

const Header = () => {
  const [show, setShow] = useState(false);
  const { data: session } = useSession();

  const { user } = session || {};

  return (
    <div className="px-10 py-8 flex justify-between items-center h-25 w-full">
      <div className="shrink-0 ">
        <Link href="/dashboard" className="hover:text-white">
          <Image
            src="/Logo.jpg"
            width={50}
            height={50}
            alt="The Ethiopian Logo"
            className="rounded-full"
          />
        </Link>
      </div>
      <ul className="flex justify-center w-auto text-center space-x-2 relative">
        {navLists?.map((list) => (
          <Links {...list} key={list.name} />
        ))}
        {user ? (
          <>
            {user?.role === "Admin" || "admin" ? (
              <>
                <Links name="Admin" path="/admin" />
                <span className="px-2">|</span>
                <section className=" relative w-[44px] h-[44px]">
                  <section className="flex justify-center items-center w-[35px] h-[35px] rounded-full overflow-hidden bg-slate-300">
                    <Image
                      src={user?.image || `/profile-avatar.png`}
                      width={40}
                      height={40}
                      alt="User image"
                    />
                    <button
                      className="absolute flex justify-center items-center bottom-1 right-0 w-[18px] h-[18px]  rounded-full bg-gray-600 caret-lime-300"
                      onClick={() => setShow(!show)}
                    >
                      {"V"}
                    </button>
                  </section>
                </section>
                {show && <UserMenu user={user} />}
              </>
            ) : (
              <>
                <LogoutForm user={user} />
              </>
            )}
          </>
        ) : (
          <Links name="Login" path="/login" />
        )}
      </ul>
    </div>
  );
};

export default Header;
