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
    <div className="sticky top-0 right-0 px-10 py-8 flex justify-end items-center h-[50px] w-full z-50 border-b border-gray-700 border-opacity-50 mb-4 bg-[#08081A]  shadow-md">
      {
        <>
          <HombergerMenu />
          <ul className="hidden sm:flex justify-center w-auto  h-[300px]text-center space-x-2 relative ml-auto">
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
        </>
      }
    </div>
  );
};

export default Header;
