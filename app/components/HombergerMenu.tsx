import { useDispatch, useSelector } from "react-redux";
import NavLists, { navLists } from "./navBar/navLists";
import Link from "next/link";
import { Menu, Moon, Sun, X, House, Cog, FileUser } from "lucide-react";
import { toggleMainMenu } from "../reduxStore/mainMenuSlice";
import Border from "../dashboard/components/border";
import { toggleDarkMode } from "../reduxStore/darkModeSlice";
import { RootState } from "@/app/reduxStore/store";
import LogoutForm from "./LogoutForm";

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
    (state: RootState) => state.mainMenu.isMainMenuOpen,
  );

  const isDarkMode = useSelector(
    (state: RootState) => state.darkMode.isDarkMode,
  );

  let menuUser = {
    username: user?.username || "",
    image: user?.image,
    email: user?.email,
  };
  return (
    <div className="relative flex items-center justify-center sm:hidden">
      {!isMainMenuOpen && (
        <Menu
          className="h-[24px] w-[24px] text-light-button dark:text-dark-button"
          onClick={() => dispatch(toggleMainMenu())}
        />
      )}
      {isMainMenuOpen && (
        <X
          className="h-[24px] w-[24px] text-light-button dark:text-dark-button"
          onClick={() => dispatch(toggleMainMenu())}
        />
      )}
      {isMainMenuOpen && (
        <ul className="absolute -right-[20px] top-[50px] z-10 flex h-auto w-[200px] flex-col items-center justify-between rounded-b-md bg-light-text-d py-3 text-center font-semibold text-gray-500 dark:bg-dark-text-d">
          <LogoutForm user={menuUser} />
          <Border direction="b" />
          <NavLists />
          <Border direction="b" />
          <section className="transition-all duration-500 hover:text-light-button">
            {isDarkMode ? (
              <Sun onClick={() => dispatch(toggleDarkMode())} size={"19px"} />
            ) : (
              <Moon onClick={() => dispatch(toggleDarkMode())} size={"19px"} />
            )}
          </section>
        </ul>
      )}
    </div>
  );
}

export default HombergerMenu;
