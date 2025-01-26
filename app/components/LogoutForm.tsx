"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { revalidatePath } from "next/cache";
import styles from "./navBar/nav.module.css";
import Image from "next/image";
import { Session } from "inspector/promises";

function LogoutForm({
  user,
}: {
  user: { username: string; image: string | undefined };
}) {
  const handleLogout = async () => {
    await signOut();
    revalidatePath("/");
  };

  return (
    <div className="flex  flex-col justify-center items-start rounded-md hover:text-gray-200 bg-slate-800 w-[190px]  p-[20px] ">
      {
        <section className="flex  flex-row justify-center items-center gap-2 w-full">
          <Image
            src={user?.image || `/profile-avatar.png`}
            alt="User Profile"
            width={23}
            height={23}
            className="rounded-full object-cover object-center bg-gray-400"
          />
          <p
            className={` text-lime-500 capitalize w-full font-semibold text-sm`}
          >
            {user?.username}
          </p>
        </section>
      }
      <button
        onClick={handleLogout}
        className="navButton bg-green-800 px-[5px] mt-3 rounded-md"
      >
        Log Out
      </button>
    </div>
  );
}

export default LogoutForm;
