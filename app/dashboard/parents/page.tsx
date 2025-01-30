"use client";
import React from "react";

import { parentsData } from "@/app/utils/data";
import SearchAndHeader from "../components/SearchAndHeader";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import Image from "next/image";
import Link from "next/link";
import FormModel from "../components/FormModel";

type ParentProps = {
  id: number;
  name: string;
  email: string;
  students: string[];
  phone: string;
  address: string;
};

const listofParent = (user: ParentProps) => {
  return (
    <tr
      key={user.id}
      className="w-full h-full flex-grow-1 border border-transparent rounded-sm even:bg-slate-900 hover:bg-gray-700"
    >
      <td className=" flex justify-start flex-col items-start ml-[6px] sm:ml-2 md:ml-3 ">
        <p className="text-sm">{user.name}</p>
        <span className="text-xs text-slate-700">{user.email}</span>
      </td>

      <td className=" px-4 py-2 text-sm hidden sm:table-cell">
        {user.students.length && user.students.join(", ")}
      </td>
      <td className="  px-4 py-2 text-sm hidden md:table-cell">{user.phone}</td>
      <td className="  px-4 py-2 text-sm hidden md:table-cell">
        {user.address}
      </td>
      <td className="  px-4 py-2 text-sm">
        <div className="flex justify-center items-center gap-1">
          <Link href={`/dashboard/teachers/${user.id}`}>
            <button className=" flex justify-center text-center  items-center w-7 h-7 p-1 bg-lime-950 rounded-full ">
              <Image
                src="/view.png"
                alt=""
                width={16}
                height={16}
                className="rounded-full bg-lime-500 object-cover"
              />
            </button>
          </Link>
          <button className="flex justify-center items-center w-7 h-7 p-1  bg-red-200 rounded-full">
            <FormModel table="Parents" type="delete" />
          </button>
        </div>
      </td>
    </tr>
  );
};
function Parents() {
  const [felteredData, setFelteredData] = React.useState(parentsData);

  const handleSearch = (search: string) => {
    if (search === "") {
      setFelteredData(parentsData);
    }
    const filtered = parentsData.filter((data) => {
      return data.name.toLowerCase().includes(search.toLowerCase());
    });
    setFelteredData(filtered);
  };
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
      <SearchAndHeader title="All Parents" handleSearch={handleSearch} />
      <Table
        data={felteredData}
        tableHeader={HeaderClass}
        Lists={listofParent}
      />
      <Pagination />
    </div>
  );
}

export default Parents;
