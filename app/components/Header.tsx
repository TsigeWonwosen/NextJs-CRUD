"use client";

import { navLists } from "./navBar/navLists";
import Links from "./navBar/Links";
import { useSession } from "next-auth/react";
import UserMenu from "./UserMenu";
import HombergerMenu from "./HombergerMenu";
import { useDispatch, useSelector } from "react-redux";
import { Moon, Sun } from "lucide-react";
import { toggleDarkMode } from "../reduxStore/darkModeSlice";

const Header = () => {
  const { data: session } = useSession();
  const { user } = session || {};

  const dispatch = useDispatch();

  const isDarkMode = useSelector(
    (state: { darkMode: { isDarkMode: boolean } }) => state.darkMode.isDarkMode,
  );
  let roles: string | undefined = user?.role
    ? user.role.toLocaleLowerCase()
    : "admin";

  return (
    <div className="bg-light-bg dark:bg-dark-bg sticky right-0 top-0 z-50 mb-4 flex h-[50px] w-full items-center justify-end border-b border-gray-400 border-opacity-50 px-10 py-8 shadow-md dark:border-gray-700">
      {
        <>
          <HombergerMenu user={user} />
          <ul className="relative ml-auto hidden h-[30px] w-auto items-center justify-center space-x-1 text-center sm:flex">
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
            <div className="flex items-center justify-center">
              <span className="px-2 text-gray-500">|</span>
              {isDarkMode ? (
                <Sun onClick={() => dispatch(toggleDarkMode())} size={"20px"} />
              ) : (
                <Moon
                  onClick={() => dispatch(toggleDarkMode())}
                  size={"20px"}
                />
              )}
            </div>
          </ul>
        </>
      }
    </div>
  );
};

export default Header;
