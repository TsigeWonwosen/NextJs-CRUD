"use client";
import React, { useState } from "react";
import StaffList from "../components/StaffList";
import { updateStaff } from "@/app/libs/action";

export type StaffType = {
  _id: string;
  username: string;
  password?: string;
  email: string;
  role: string;
  img?: string;
};
function Staff({ users }: { users: StaffType[] }) {
  const [isEdit, setIsEdit] = useState(false);
  const [user, setUser] = useState<StaffType>({
    _id: "",
    username: "",
    email: "",
    role: "",
    img: "",
  });

  const handleEditeUser = (id: string) => {
    setIsEdit(true);
    if (id) {
      const updateUser = users.filter((user: StaffType) => user._id === id);

      setUser(updateUser[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateStaff(user._id, user);
    setIsEdit(false);
  };
  return (
    <div className="relative h-full w-full rounded-md bg-light-bgw p-4 dark:bg-dark-bg-b">
      <section className="flex items-center justify-between px-5 text-[13px] font-semibold text-slate-500">
        <span>Info</span>
        <span>Role</span>
        <span>Action</span>
      </section>
      <ul className="mt-3 h-full w-full">
        {users?.map((user: StaffType, index) => (
          <StaffList
            key={index}
            user={user}
            handleEditeUser={handleEditeUser}
          />
        ))}
      </ul>
      {isEdit && (
        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-gray-900/50 dark:bg-gray-700/50">
          <div className="flex h-[80%] w-[80%] max-w-[400px] flex-col items-center justify-center rounded-md bg-light-bgw p-6 dark:bg-dark-bg sm:w-[50%]">
            <h3 className="mb-2 text-lg font-semibold">Edit User</h3>
            <form
              onSubmit={handleSubmit}
              className="flex h-full w-[90%] flex-col items-center justify-center gap-2"
            >
              <input
                type="text"
                placeholder="Enter username"
                name="_id"
                defaultValue={user && user?._id}
                value={user && user?._id}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, _id: e.target.value }))
                }
                className="hidden"
              />
              <input
                type="text"
                placeholder="Enter username"
                name="username"
                defaultValue={user && user?.username}
                value={user && user?.username}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, username: e.target.value }))
                }
                className="w-full rounded-md px-1 py-[6px]"
              />
              <input
                type="text"
                placeholder="Enter email"
                name="email"
                defaultValue={user && user?.email}
                value={user && user?.email}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full rounded-md px-1 py-[5px]"
              />
              <input
                type="text"
                placeholder="Enter role"
                name="role"
                defaultValue={user && user?.role}
                value={user && user?.role}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, role: e.target.value }))
                }
                className="w-full rounded-md px-1 py-[5px]"
              />
              <input
                type="text"
                placeholder="Enter img"
                name="img"
                defaultValue={user && user?.img}
                value={user && user?.img}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, img: e.target.value }))
                }
                className="w-full rounded-md px-1 py-[5px]"
              />
              <button
                type="submit"
                className="mt-2 w-full rounded-md bg-sky-400 px-2 py-2 text-gray-200"
              >
                submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Staff;
