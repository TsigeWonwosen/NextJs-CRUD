"use client";
import React, { useEffect, useState } from "react";

import Table from "../components/Table";
import Link from "next/link";
import FormModel from "../components/FormModel";
import PaginationServerSide from "../components/PaginationServerSide";
import SearchAndHeaderServerSide from "../components/SearchAndHeaderServerSide";
import { useSearchParams } from "next/navigation";
import { Parent } from "@prisma/client";
import { getParents } from "@/app/actions/parentAction";
import { ParentProps } from "@/app/libs/types";

const listofParent = (user: Parent) => {
  return (
    <tr
      key={user.id}
      className="w-full h-full flex-grow-1 border border-transparent rounded-sm even:bg-slate-900 hover:bg-gray-700"
    >
      <td className=" flex justify-start flex-col items-start ml-[6px] sm:ml-2 md:ml-3 ">
        <p className="text-sm">{user.name}</p>
        <span className="text-xs text-slate-700">{user.email}</span>
      </td>

      <td className=" px-4 py-2 text-sm hidden sm:table-cell">{user.name}</td>
      <td className="  px-4 py-2 text-sm hidden md:table-cell">{user.phone}</td>
      <td className="  px-4 py-2 text-sm hidden md:table-cell">
        {user.address}
      </td>
      <td className="  px-4 py-2 text-sm">
        <div className="flex justify-center items-center gap-1">
          <Link href={`/dashboard/teachers/${user.id}`}></Link>
          <FormModel
            table="parent"
            type="update"
            studentId={user.id + ""}
            data={user}
          />
          <button className="flex justify-center items-center w-7 h-7 p-1  bg-red-200 rounded-full">
            <FormModel
              table="parent"
              type="delete"
              studentId={user.id}
              data={user}
            />
          </button>
        </div>
      </td>
    </tr>
  );
};
function Parents() {
  const [updated, setUpdated] = useState<ParentProps[]>([]);

  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  useEffect(() => {
    const getFullParents = async () => {
      const { parents, totalparent } = await getParents();
      setUpdated(parents);
    };
    getFullParents();
  }, [search]);

  const HeaderClass = [
    {
      header: "Info",
    },
    {
      header: "students",
      class: "hidden md:table-cell",
    },
    {
      header: "Phone",
      class: "hidden md:table-cell",
    },

    {
      header: "Address",
      class: "hidden md:table-cell",
    },
    {
      header: "Action",
    },
  ];

  return (
    <div className="mx-auto p-4 flex flex-col w-full h-full">
      <SearchAndHeaderServerSide title="All Parents" />
      <Table data={updated} tableHeader={HeaderClass} Lists={listofParent} />
      <PaginationServerSide totalPages={updated.length / 10} />
    </div>
  );
}

export default Parents;
