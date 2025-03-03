"use client";
import React, { use, useEffect, useState } from "react";
import Pagination from "./Pagination";
import SearchAndHeader from "./SearchAndHeader";
import StudentsList, { StudentListProps } from "./StudentsList";
import { PER_PAGE } from "@/app/libs/constants";

function StudentClient({
  students,
  totalSudents,
  relatedData,
}: {
  students: StudentListProps[];
  totalSudents: number;
  relatedData: any;
}) {
  const [studentData, setStudentData] = useState<StudentListProps[]>(students);
  const [felteredData, setFelteredData] = useState<StudentListProps[]>(
    studentData.slice(0, PER_PAGE),
  );

  const handleSearch = (search: string) => {
    const filtered = studentData.filter((data) => {
      return (
        data.name.toLowerCase().includes(search.toLowerCase()) ||
        data.id.toString().includes(search)
      );
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

  const listOfStudents = felteredData.map((student) => {
    return (
      <StudentsList key={student.id} user={student} relatedData={relatedData} />
    );
  });

  return (
    <div className="w-full">
      <SearchAndHeader
        title="All Students"
        handleSearch={handleSearch}
        relatedData={relatedData}
      />
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

        <tbody>{listOfStudents}</tbody>
      </table>
      <Pagination total={totalSudents} handleChange={handlePagination} />
    </div>
  );
}

export default StudentClient;
