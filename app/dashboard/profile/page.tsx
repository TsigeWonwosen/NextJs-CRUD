import { getStaffs } from "@/app/libs/action";
import React from "react";
import Staff from "../components/Staff";

async function Profile() {
  const users = await getStaffs();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-light-text dark:text-dark-text">
      <Staff users={users} />
    </div>
  );
}

export default Profile;
