"use client";

import { deleteStaff } from "@/app/libs/action";
import { StaffType } from "./Staff";
import { Edit, X } from "lucide-react";

function Staff({
  user,
  handleEditeUser,
}: {
  user: StaffType;
  handleEditeUser: (id: string) => void;
}) {
  return (
    <>
      {
        <li
          key={user?._id}
          className="duration-3000 mb-1 flex h-auto w-full items-center justify-between rounded-md border-[0.3px] border-gray-500/10 px-4 py-1 pr-6 transition-all hover:scale-[1.01]"
        >
          <section className="mb-1 w-full">
            <h5 className="font-semibold capitalize text-slate-400">
              {user.username}
            </h5>
            <p className="text-sm">{user?.email}</p>
          </section>
          <section className="flex h-full w-[150px] items-center justify-center">
            <h6 className="w-full pl-3 text-left font-semibold capitalize text-slate-400/70">
              {user.role}
            </h6>
          </section>
          <section className="flex w-full items-center justify-end gap-2">
            <button onClick={() => handleEditeUser(user._id)}>
              <Edit className="h-[15px] w-[15px] text-gray-500/80 transition duration-200 hover:text-gray-500" />
            </button>
            <form action={deleteStaff}>
              <input type="hidden" name="_id" value={user._id} />
              <button
                type="submit"
                className="h-[12px] w-[10px] text-[12px] text-red-500"
              >
                <X className="h-[15px] w-[15px] text-red-500/50 transition duration-200 hover:text-red-500/80" />
              </button>
            </form>
          </section>
        </li>
      }
    </>
  );
}

export default Staff;
