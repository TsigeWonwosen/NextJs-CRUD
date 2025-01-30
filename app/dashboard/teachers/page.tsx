"use client";
import React from "react";

import { teachersData } from "@/app/utils/data";
import SearchAndHeader from "../components/SearchAndHeader";
import Table from "../components/Table";
import TeachersList from "../components/TeachersList";
import Pagination from "../components/Pagination";

function Teachers() {
  const [felteredData, setFelteredData] = React.useState(teachersData);

  const handleSearch = (search: string) => {
    const filtered = teachersData.filter((data) => {
      return data.name.toLowerCase().includes(search.toLowerCase());
    });
    setFelteredData(filtered);
  };
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
      <SearchAndHeader title="All Teachers" handleSearch={handleSearch} />
      <Table
        data={felteredData}
        tableHeader={HeaderClass}
        Lists={TeachersList}
      />
      <Pagination />
    </div>
  );
}

export default Teachers;
