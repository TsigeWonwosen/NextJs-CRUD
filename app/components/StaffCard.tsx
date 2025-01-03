import React from "react";
import { deleteStaff } from "../libs/action";
import { StaffType } from "../libs/types";

function StaffCard({ staff }: { staff: StaffType }) {
  const { username, email, role, _id } = staff;
  return (
    <ul role="list" className=" max-w-screen-md divide-y divide-gray-100">
      <li className="flex justify-between gap-x-6 py-5  p-3">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm/6 font-semibold text-gray-50">{username}</p>
            <p className="mt-1 truncate text-xs/5 text-gray-50">{email}</p>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p className="text-sm/6 text-gray-300">{role}</p>
          <p className="mt-1 text-xs/5 text-gray-300">
            Last seen <time dateTime="2023-01-23T13:23Z">3h ago</time>
          </p>
        </div>
        <form action={deleteStaff}>
          <input type="hidden" name="_id" value={_id} />
          <button className="text-red-900">X</button>
        </form>
      </li>
    </ul>
  );
}

export default StaffCard;
