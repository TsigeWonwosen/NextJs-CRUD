import React from "react";

import { teachersData } from "@/app/utils/data";
import ListCard from "./ListCard";
import SearchAndHeader from "./SearchAndHeader";
import Table from "./Table";
import Pagination from "./Pagination";

function TeacherTable() {
  const Header = [
    "Info",
    "Teacher Id",
    "Subjects",
    "Class",
    "Address",
    "Phone",
    "Action",
  ];

  return (
    <div className="mx-auto p-4 flex flex-col">
      <SearchAndHeader title="All Teachers" />
      <Table data={teachersData} tableHeader={Header} />
      <Pagination />
    </div>
  );
}

export default TeacherTable;
