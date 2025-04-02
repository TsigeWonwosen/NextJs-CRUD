import { getStaffs } from "@/app/libs/action";
import React from "react";
import Staff from "../components/Staff";

async function Profile() {
  const users = await getStaffs();

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center text-gray-500">
      <Staff users={users} />
    </div>
  );
}

export default Profile;
