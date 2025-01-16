import React from "react";
import LogoutForm from "./LogoutForm";
import Image from "next/image";

function UserMenu({
  user,
}: {
  user: { username: string; image: string | undefined };
}) {
  return (
    <div className="flex flex-col justify-start items-center absolute top-11 right-0  ">
      <LogoutForm user={user} />
    </div>
  );
}

export default UserMenu;
