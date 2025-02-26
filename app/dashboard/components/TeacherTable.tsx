import React from "react";

import { teachersData } from "@/app/utils/data";
import SearchAndHeader from "./SearchAndHeader";
import Table from "./Table";
import Pagination from "./Pagination";
import TeachersList from "./TeachersList";

function TeacherTable() {
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
    <div className="mx-auto flex flex-col p-4">
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

export default TeacherTable;
