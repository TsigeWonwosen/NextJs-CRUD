import Link from "next/link";
import React from "react";
import { User } from "../dashboard/@user/page";

function ListUsers({ _id, name, email }: User) {
  return (
    <Link href={`/dashboard/user/${_id}`} className="list-none text-left">
      {name}
    </Link>
  );
}

export default ListUsers;
