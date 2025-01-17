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
            {user?.role === "Admin" || user?.role === "admin" ? (
              <>
                <Links name="Admin" path="/admin" />
                <span className="px-2">|</span>
                <UserMenu user={user} />
              </>
            ) : (
              <>
                <span className="px-2">|</span>
                <UserMenu user={user} />
              </>
            )}
          </>
        ) : (
          <>
            <Links name="Login" path="/login" />
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;
