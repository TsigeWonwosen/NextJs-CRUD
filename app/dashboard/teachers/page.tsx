import React from "react";

import { teachersData } from "@/app/utils/data";
import SearchAndHeader from "../components/SearchAndHeader";
import Table from "../components/Table";
import TeachersList from "../components/TeachersList";
import Pagination from "../components/Pagination";

function Teachers() {
  const HeaderClass = [
    {
      header: "Info",
    },
    {
      header: "Teacher Id",
      class: "hidden md:table-cell",
    },
    {
      header: "Subjects",
      class: "hidden md:table-cell",
    },
    {
      header: "Classes",
      class: "hidden sm:table-cell",
    },
    {
      header: "Address",
      class: "hidden md:table-cell",
    },
    {
      header: "Phone",
      class: "hidden md:table-cell",
    },
    {
      header: "Action",
    },
  ];

  return (
    <div className="mx-auto p-4 flex flex-col w-full h-full">
      <SearchAndHeader title="All Teachers" />
      <Table
        data={teachersData}
        tableHeader={HeaderClass}
        Lists={TeachersList}
      />
      <Pagination />
    </div>
  );
}

export default Teachers;
