"use client";

import React, { useState } from "react";
import LogoutForm from "./LogoutForm";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

function UserMenu({
  user,
}: {
  user: { username: string; image: string | undefined; email: string };
}) {
  const [show, setShow] = useState(false);
  const handleChange = () => {
    setShow(!show);
  };

  return (
    <>
      <section className="relative h-auto w-[44px]">
        <section className="flex h-[27px] w-[27px] items-center justify-center overflow-hidden rounded-full bg-gray-500">
          <Image
            src={user?.image || `/profile-avatar.png`}
            className="object-cover"
            width={30}
            height={30}
            alt="User image"
          />
          <button
            className="absolute -bottom-1 right-2 flex h-[16px] w-[16px] items-center justify-center rounded-full bg-light-primary font-bold caret-lime-300 dark:bg-dark-primary"
            onClick={handleChange}
          >
            <ChevronDown className="text-gray-300" />
          </button>
        </section>
        {show && (
          <div className="absolute -right-1 top-[52px] z-20 flex flex-col items-center justify-start">
            <LogoutForm user={user} />
          </div>
        )}
      </section>
    </>
  );
}

export default UserMenu;
