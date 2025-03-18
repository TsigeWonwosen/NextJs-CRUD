"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { revalidatePath } from "next/cache";
import Image from "next/image";

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
    <div className="flex w-[190px] flex-col items-start justify-center rounded-md bg-[#151b23] p-[20px] hover:text-gray-200">
      <section className="flex w-full flex-row items-center justify-center gap-2">
        <Image
          src={user?.image || `/profile-avatar.png`}
          alt="User Profile"
          width={23}
          height={23}
          className="rounded-full bg-gray-400 object-cover object-center"
        />
        <p className={`w-full text-sm font-semibold capitalize text-lime-500`}>
          {user?.username}
        </p>
      </section>

      <button
        onClick={handleLogout}
        className="mt-3 rounded-md bg-green-800 px-[5px]"
      >
        Log Out
      </button>
    </div>
  );
}

export default LogoutForm;
