"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { revalidatePath } from "next/cache";
import styles from "./navBar/nav.module.css";

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
    <div className="flex  flex-col justify-center items-start hover:text-gray-200 bg-slate-800 w-[200px] h-[80px] p-[10px] ">
      {
        <div className="flex text-start">
          <p className={`${styles.navButton} text-lime-500 capitalize w-full`}>
            {user?.username}
          </p>
        </div>
      }
      <button onClick={handleLogout} className="navButton bg-green-800 p-[3px]">
        Log Out
      </button>
    </div>
  );
}

export default LogoutForm;
