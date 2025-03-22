import { toggleMainMenu } from "@/app/reduxStore/mainMenuSlice";
import { House, Cog, FileUser } from "lucide-react";
import Link from "next/link";

export const navLists = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
];

import React from "react";
import { useDispatch } from "react-redux";

export default function NavLists() {
  const dispatch = useDispatch();

  const newNavLists = [
    { name: "Home", path: "/", icon: <House size={"12px"} /> },
    { name: "Services", path: "/services", icon: <Cog size={"12px"} /> },
    { name: "About", path: "/about", icon: <FileUser size={"12px"} /> },
  ];

  return (
    <>
      {newNavLists?.map((list) => (
        <Link
          key={list.name}
          href={list.path}
          onClick={() => dispatch(toggleMainMenu())}
          className="flex w-[100%] flex-row-reverse items-center justify-end gap-3 rounded-md px-[20px] py-1 text-light-secondary hover:bg-light-primary hover:text-white dark:text-dark-text"
        >
          <span className="text-[12px]">{list.name}</span>
          {list.icon}
        </Link>
      ))}
    </>
  );
}
