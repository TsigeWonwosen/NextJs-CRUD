import React from "react";
import Link from "next/link";
import ListUsers from "@/app/components/ListUsers";
import { User } from "./page";

async function UsersDefault() {
  let { users } = await getData();
  return (
    <div className="flex flex-col text-start">
      <h3>Default</h3>
      {users?.map((user: User) => (
        <ListUsers key={user._id} {...user} />
      ))}
    </div>
  );
}

export default UsersDefault;

// This function runs on the server before the page is rendered.
export async function getData() {
  const res = await fetch("http://localhost:3000/users/api", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
