"use client";

import React, { useState } from "react";
import LogoutForm from "./LogoutForm";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

function UserMenu({
  user,
}: {
  user: { username: string; image: string | undefined };
}) {
  const [show, setShow] = useState(false);
  const handleChange = () => {
    setShow(!show);
  };

  return (
    <>
      <section className="relative h-[44px] w-[44px]">
        <section className="flex h-[35px] w-[35px] items-center justify-center overflow-hidden rounded-full bg-slate-300">
          <Image
            src={user?.image || `/profile-avatar.png`}
            className="object-cover"
            width={25}
            height={25}
            alt="User image"
          />
          <button
            className="absolute bottom-1 right-0 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-gray-600 font-bold caret-lime-300"
            onClick={handleChange}
          >
            <ChevronDown className="text-gray-300" />
          </button>
        </section>
      </section>
      <div className="absolute right-0 top-12 z-20 flex flex-col items-center justify-start">
        {show && <LogoutForm user={user} />}
      </div>
    </>
  );
}

export default UserMenu;
