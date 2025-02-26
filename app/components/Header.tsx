"use client";

import { navLists } from "./navBar/navLists";
import Links from "./navBar/Links";
import { useSession } from "next-auth/react";
import UserMenu from "./UserMenu";
import HombergerMenu from "./HombergerMenu";

const Header = () => {
  const { data: session } = useSession();
  const { user } = session || {};

  return (
    <div className="sticky right-0 top-0 z-50 mb-4 flex h-[50px] w-full items-center justify-end border-b border-gray-700 border-opacity-50 bg-[#08081A] px-10 py-8 shadow-md">
      {
        <>
          <HombergerMenu />
          <ul className="h-[300px]text-center relative ml-auto hidden w-auto justify-center space-x-2 sm:flex">
            {navLists?.map((list) => <Links {...list} key={list.name} />)}
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
        </>
      }
    </div>
  );
};

export default Header;
