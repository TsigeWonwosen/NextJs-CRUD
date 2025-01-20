import React from "react";
import ListUsers from "../../components/ListUsers";
import { fetchUsers } from "@/app/libs/fetchUsers";

type User = {
  _id: string;
  name: string;
  email: string;
};
async function Users() {
  let { users } = await fetchUsers();
  return (
    <div className="flex flex-col text-start">
      {users?.map((user: User) => (
        <ListUsers key={user._id} {...user} />
      ))}
    </div>
  );
}

export default Users;
