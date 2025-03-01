"use client";
import React, { useState } from "react";
import Pagination from "./Pagination";
import SearchAndHeader from "./SearchAndHeader";
import { StudentSchemaType } from "@/app/libs/types";

const PER_PAGE = 10;

function StudentClient({
  students,
  totalSudents,
  studentList,
}: {
  students: StudentSchemaType[];
  totalSudents: number;
  studentList: any;
}) {
  const [studentData, setStudentData] = useState<StudentSchemaType[]>(
    students.slice(0, PER_PAGE),
  );
  const [felteredData, setFelteredData] =
    useState<StudentSchemaType[]>(studentData);

  const handleSearch = (search: string) => {
    const filtered = studentData.filter((data) => {
      return data.name.toLowerCase().includes(search.toLowerCase());
    });
    setFelteredData(filtered);
  };
  const handlePagination = (page: number) => {
    const start = (page - 1) * PER_PAGE;
    const end = page * PER_PAGE;
    setFelteredData(students.slice(start, end));
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
      header: "Class",
      class: "hidden md:table-cell",
    },
    {
      header: "Grade",
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
    <>
      <SearchAndHeader title="All Students" handleSearch={handleSearch} />
      <table className="min-w-full border-collapse overflow-hidden rounded-md border-0 border-b-slate-700">
        <thead className="w-full rounded-full border-0">
          <tr className="w-full border-0 border-slate-800 bg-gray-900 text-[14px]">
            {HeaderClass.map((header, index) => (
              <th
                key={index}
                className={`border-b border-gray-500 px-3 py-2 text-left last:text-center ${header.class}`}
              >
                {header.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{studentList}</tbody>
      </table>
      <Pagination total={totalSudents} handleChange={handlePagination} />
    </>
  );
}

export default StudentClient;
