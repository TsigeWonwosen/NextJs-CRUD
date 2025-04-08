"use client";
import React, { use, useState } from "react";
import StaffList from "../components/StaffList";
import { updateStaff } from "@/app/libs/action";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import SingleProfile from "./SingleProfile";

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
  const session = useSession();

  if (!session) {
    return <h1 className="text-center text-gray-500">Please login</h1>;
  }
  let userRole = session?.data?.user?.role.toLowerCase();
  let userId = session?.data?.user?.id;
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
    <div className="relative flex h-full w-full flex-col rounded-md bg-light-bgw p-4 dark:bg-dark-bg-b">
      <div className="h-auto w-full">
        {userRole === "admin"
          ? users?.map((user: StaffType, index) => (
              <ul className="mt-3 flex h-full w-full flex-col">
                <section className="flex items-center justify-between px-5 text-[13px] font-semibold text-slate-500">
                  <span>Info</span>
                  <span>Role</span>
                  <span>Action</span>
                </section>
                <StaffList
                  key={index}
                  user={user}
                  handleEditeUser={handleEditeUser}
                />
              </ul>
            ))
          : users
              ?.filter(
                (user: StaffType) =>
                  user.role.toLocaleLowerCase() === userRole &&
                  user._id === userId,
              )
              .map((user: StaffType, index) => (
                <SingleProfile
                  key={index}
                  user={user}
                  handleEditeUser={handleEditeUser}
                />
              ))}
      </div>
      {isEdit && (
        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-gray-500/30 dark:bg-gray-800/40">
          <div className="relative flex h-auto w-[80%] max-w-[400px] flex-col items-center justify-center rounded-md bg-light-bgw p-6 dark:bg-dark-bg-b sm:w-[50%]">
            <h3 className="mb-4 text-lg font-semibold">Edit User</h3>
            <form
              onSubmit={handleSubmit}
              className="flex h-full w-[97%] flex-col items-center justify-center gap-[10px]"
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

              <InputField
                type="text"
                name="Username"
                placeholder="Enter username"
                defaultValue={user && user?.username}
                value={user && user?.username}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, username: e.target.value }))
                }
              />

              <InputField
                type="text"
                name="email"
                placeholder="Enter email"
                defaultValue={user && user?.email}
                value={user && user?.email}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, email: e.target.value }))
                }
              />

              <InputField
                type="text"
                name="role"
                placeholder="Enter Role"
                defaultValue={user && user?.role}
                value={user && user?.role}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, role: e.target.value }))
                }
              />

              <InputField
                type="text"
                name="img"
                placeholder="Enter img"
                defaultValue={(user && user?.img) || "Enter img url"}
                value={(user && user?.img) || ""}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, img: e.target.value }))
                }
              />

              <button
                type="submit"
                className="mt-2 w-full rounded-md bg-sky-400 px-2 py-[6px] text-[15px] font-semibold text-gray-200 transition duration-200 hover:bg-sky-500/80"
              >
                submit
              </button>
            </form>
            <section className="absolute right-5 top-7">
              <button onClick={() => setIsEdit(false)}>
                <X
                  size={"15px"}
                  className="text-gray-400/50 transition duration-200 hover:text-gray-400/90"
                />
              </button>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

export default Staff;

const InputField = ({
  type,
  name,
  placeholder,
  defaultValue,
  value,
  onChange,
}: {
  type: string;
  name: string;
  placeholder: string;
  defaultValue: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      className="w-full rounded-md bg-light-bg px-2 py-[6px] pl-3 text-gray-500/80 transition duration-200 placeholder:text-gray-500/50 focus:outline-none focus:ring-2 focus:ring-sky-400 dark:bg-dark-bg"
    />
  );
};
