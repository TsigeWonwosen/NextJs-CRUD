"use client";

import { deleteStaff } from "@/app/libs/action";
import { StaffType } from "./Staff";

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
          className="duration-3000 mb-1 flex h-full w-full items-center justify-between rounded-md border-[0.3px] border-gray-500/10 px-3 py-1 transition-all hover:scale-[1.01]"
        >
          <section className="mb-1 w-full">
            <h5 className="font-semibold text-slate-400">{user.username}</h5>
            <p className="text-sm">{user?.email}</p>
          </section>
          <section className="flex h-full w-full items-center justify-center">
            <h6 className="font-semibold text-slate-400">{user.role}</h6>
          </section>
          <section className="flex w-full items-center justify-end gap-2">
            <button onClick={() => handleEditeUser(user._id)}>Edit</button>
            <form action={deleteStaff}>
              <input type="hidden" name="_id" value={user._id} />
              <button type="submit">Delete</button>
            </form>
          </section>
        </li>
      }
    </>
  );
}

export default Staff;
