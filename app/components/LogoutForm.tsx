"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { LogOut } from "lucide-react";

function LogoutForm({
  user,
}: {
  user: {
    username: string;
    image: string | undefined;
    email: string | undefined;
  };
}) {
  const handleLogout = async () => {
    await signOut();
    revalidatePath("/");
  };

  return (
    <div className="shadow-t-sm dark:bg-dark-text-d bg-light-text-d relative flex w-[190px] flex-col items-start justify-center rounded-md p-[20px] text-light-text shadow-gray-500/50 transition-shadow duration-300 hover:shadow-sm hover:shadow-gray-700/50 dark:text-dark-text">
      <section className="flex w-full flex-row items-start justify-center gap-2">
        <Image
          src={user?.image || `/profile-avatar.png`}
          alt="User Profile"
          width={23}
          height={23}
          className="rounded-full bg-gray-400 object-cover object-center"
        />
        <div className="flex flex-col items-center justify-start gap-1 text-start">
          <p className={`w-full text-[13px] font-semibold capitalize`}>
            {user?.username}
          </p>
          <span className="font-semibol text-[9px] text-gray-500">
            {user.email}
          </span>
        </div>
      </section>

      <button
        onClick={handleLogout}
        className="mt-3 flex w-full items-center justify-start gap-2 rounded-md"
      >
        <LogOut size={"12px"} />
        <span className="rounded-md px-[5px] text-[12px]">Log Out</span>
      </button>

      <section className="dark:bg-dark-text-d bg-light-text-d absolute -top-2 right-5 h-[15px] w-[15px] rotate-45"></section>
    </div>
  );
}

export default LogoutForm;
