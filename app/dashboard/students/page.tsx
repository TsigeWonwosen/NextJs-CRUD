"use client";
import React from "react";
import { studentsData } from "@/app/utils/data";
import SearchAndHeader from "../components/SearchAndHeader";
import Pagination from "../components/Pagination";
import StudentsList from "../components/StudentsList";
import Table from "../components/Table";

function Students() {
  const [felteredData, setFelteredData] = React.useState(studentsData);
  const handleSearch = (search: string) => {
    const filtered = studentsData.filter((data) => {
      return data.name.toLowerCase().includes(search.toLowerCase());
    });
    setFelteredData(filtered);
  };
  const HeaderClass = [
    {
      header: "Info",
    },
    {
      header: "Student Id",
      class: "hidden md:table-cell",
    },
    {
      header: "Email",
      class: "hidden md:table-cell",
    },
    {
      header: "Grade",
      class: "hidden sm:table-cell",
    },
    {
      header: "Class",
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
    <div className="w-full h-full mx-auto p-4 flex flex-col">
      <SearchAndHeader title="All Students" handleSearch={handleSearch} />

      <Table
        Lists={StudentsList}
        tableHeader={HeaderClass}
        data={felteredData}
      />

      <Pagination />
    </div>
  );
}

export default Students;
