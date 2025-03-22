"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSideMenu } from "../reduxStore/sideMenuSlice";
import { closeMainMenu } from "../reduxStore/mainMenuSlice";

const CloseMenuOnClick = () => {
  const dispatch = useDispatch();

  const isSideMenuOpen = useSelector(
    (state: { sideMenu: { isSideMenuOpen: boolean } }) =>
      state.sideMenu.isSideMenuOpen,
  );

  const isMainMenuOpen = useSelector(
    (state: { mainMenu: { isMainMenuOpen: boolean } }) =>
      state.mainMenu.isMainMenuOpen,
  );

  const isDarkMode = useSelector(
    (state: { darkMode: { isDarkMode: boolean } }) => state.darkMode.isDarkMode,
  );

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleClick = () => {
      if (isSideMenuOpen || isMainMenuOpen) {
        dispatch(closeSideMenu());
        // dispatch(closeMainMenu());
      }
    };
    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [isMainMenuOpen, isSideMenuOpen, dispatch]);

  return null;
};

export default CloseMenuOnClick;
