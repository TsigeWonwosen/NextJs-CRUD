import React from "react";
import { studentsData } from "@/app/utils/data";
import SearchAndHeader from "../components/SearchAndHeader";
import Pagination from "../components/Pagination";
import StudentsList from "../components/StudentsList";

function Students() {
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
    <div className="mx-auto p-4 flex flex-col">
      <SearchAndHeader title="All Students" />
      <table className="min-w-full border-collapse border-0 border-b-slate-700 rounded-full">
        <thead className="rounded-full border-0 w-full">
          <tr className="bg-slate-700 text-sm  border-0 border-slate-800 w-full">
            {HeaderClass.map((header, index) => (
              <th
                key={index}
                className={`border-b border-gray-500 px-4 py-2 text-left  ${header.class}`}
              >
                {header.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="border-b border-y-gray-900">
          {studentsData.map((student) => (
            <StudentsList key={student.id} user={student} />
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
}

export default Students;
