"use client";

import React, { useState } from "react";
import LogoutForm from "./LogoutForm";
import Image from "next/image";

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
      <section className=" relative w-[44px] h-[44px]">
        <section className="flex justify-center items-center w-[35px] h-[35px] rounded-full overflow-hidden bg-slate-300">
          <Image
            src={user?.image || `/profile-avatar.png`}
            className="object-cover"
            width={25}
            height={25}
            alt="User image"
          />
          <button
            className="absolute flex justify-center items-center bottom-1 right-0 w-[18px] h-[18px] font-bold rounded-full bg-gray-600 caret-lime-300"
            onClick={handleChange}
          >
            {"V"}
          </button>
        </section>
      </section>
      <div className="flex flex-col justify-start items-center absolute top-12 right-0  z-20">
        {show && <LogoutForm user={user} />}
      </div>
    </>
  );
}

export default UserMenu;
