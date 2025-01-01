"use client";
import React, { use, useActionState, useEffect, useState } from "react";
import { addUser, getStaffs } from "@/app/libs/action";
import ListOfStaff from "@/app/components/ListOfStaff";
import StaffCard from "@/app/components/StaffCard";

function Admin() {
  const [state, action, isPanding] = useActionState(addUser, null);
  const [staffs, setStaffs] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await getStaffs();

      setStaffs(data);
    };
    getData();
  }, []);

  return (
    <div className="flex gap-x-4">
      <div className="w-1/2 bg-slate-900 rounded-lg p-7 items-center">
        {staffs.map((staff) => {
          return <StaffCard key={staff.email} staff={staff} />;
        })}
      </div>
      <form
        action={action}
        className="w-1/2 bg-slate-900 p-10 rounded-lg shadow-md "
      >
        <h2 className="text-2xl font-bold mb-4 text-center text--">Add User</h2>

        <div className="mb-4">
          <label
            htmlFor="username"
            className=" text-left block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className=" text-left  block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className=" p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className=" text-left  block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="role"
            className=" text-left  block text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          >
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
            <option value="guest">Guest</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isPanding}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isPanding ? "adding..." : "Add user"}
        </button>
        {state?.error && <p className="text-red-500 mt-2">{state.error}</p>}
      </form>
    </div>
  );
}

export default Admin;
