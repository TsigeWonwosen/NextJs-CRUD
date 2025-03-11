"use client";

import { navLists } from "./navBar/navLists";
import Links from "./navBar/Links";
import { useSession } from "next-auth/react";
import UserMenu from "./UserMenu";
import HombergerMenu from "./HombergerMenu";

const Header = () => {
  const { data: session } = useSession();
  const { user } = session || {};

  let roles = user?.role.toLocaleLowerCase();

  return (
    <div className="sticky right-0 top-0 z-50 mb-4 flex h-[50px] w-full items-center justify-end border-b border-gray-700 border-opacity-50 bg-[#08081A] px-10 py-8 shadow-md">
      {
        <>
          <HombergerMenu />
          <ul className="relative ml-auto hidden h-[30px] w-auto items-center justify-center space-x-2 text-center sm:flex">
            {navLists?.map((list) => <Links {...list} key={list.name} />)}
            {user ? (
              <>
                {roles === "admin" ? (
                  <>
                    <Links name="Admin" path="/admin" />
                    <span className="h-[20px] w-1 px-2 text-gray-500">|</span>
                    <UserMenu user={user} />
                  </>
                ) : (
                  <>
                    <span className="px-2 text-gray-500">|</span>
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
