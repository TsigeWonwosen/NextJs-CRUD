import { useDispatch, useSelector } from "react-redux";
import { navLists } from "./navBar/navLists";
import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import UserMenu from "./UserMenu";
import { toggleMainMenu } from "../reduxStore/mainMenuSlice";
import Border from "../dashboard/components/border";
import { toggleDarkMode } from "../reduxStore/darkModeSlice";

type UserType = {
  id: string;
  username: string;
  email: string;
  role: string;
  image: string | undefined;
};

function HombergerMenu({ user }: { user?: UserType }) {
  const dispatch = useDispatch();
  const isMainMenuOpen = useSelector(
    (state: { mainMenu: { isMainMenuOpen: boolean } }) =>
      state.mainMenu.isMainMenuOpen,
  );

  const isDarkMode = useSelector(
    (state: { darkMode: { isDarkMode: boolean } }) => state.darkMode.isDarkMode,
  );

  let menuUser = {
    username: user?.username || "",
    image: user?.image,
  };
  return (
    <div className="relative flex items-center justify-center sm:hidden">
      {!isMainMenuOpen && (
        <Menu
          className="h-[25px] w-[25px]"
          onClick={() => dispatch(toggleMainMenu())}
        />
      )}
      {isMainMenuOpen && (
        <X
          className="h-[25px] w-[25px]"
          onClick={() => dispatch(toggleMainMenu())}
        />
      )}
      {isMainMenuOpen && (
        <ul className="absolute -right-[20px] top-[50px] z-10 flex h-[250px] w-[200px] flex-col items-center justify-between rounded-b-md bg-slate-800 py-3 text-center font-semibold text-gray-500">
          <UserMenu user={menuUser} />
          {navLists?.map((list) => (
            <Link
              key={list.name}
              href={list.path}
              onClick={() => dispatch(toggleMainMenu())}
              className="w-[90%] rounded-md px-2 py-1 hover:bg-slate-600"
            >
              {list.name}{" "}
            </Link>
          ))}
          <div className="w-[80%]">
            <Border direction="b" />
          </div>
          {isDarkMode ? (
            <Sun onClick={() => dispatch(toggleDarkMode())} />
          ) : (
            <Moon onClick={() => dispatch(toggleDarkMode())} />
          )}
        </ul>
      )}
    </div>
  );
}

export default HombergerMenu;
