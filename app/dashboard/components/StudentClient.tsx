"use client";
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import SearchAndHeader from "./SearchAndHeader";
import StudentsList, { StudentListProps } from "./StudentsList";
import { PER_PAGE } from "@/app/libs/constants";
import { getStudentsWithQuery } from "@/app/actions/studentActions";
import { useSearchParams } from "next/navigation";

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
  const searchParam = useSearchParams();

  const hundleUpdateStudent = async () => {
    const { students, totalStudents } = await getStudentsWithQuery({
      search: searchParam.get("search") || undefined,
      name: searchParam.get("name") || undefined,
      id: searchParam.get("id") || undefined,
      sort: searchParam.get("sort") || undefined,
    });

    const studentsUpdated = students.map((student) => ({
      ...student,
      attendances: student.attendances?.map((attendance) => attendance.id),
      results: student.results.map((result) => result.id),
    }));
    setFelteredData(studentsUpdated.slice(0, PER_PAGE));
  };

  const handleSearch = (search: string) => {
    if (!search) {
      setFelteredData(studentData.slice(0, PER_PAGE));
      return;
    }
    const filtered = studentData.filter((data) => {
      return (
        data.name.toLowerCase().includes(search.toLowerCase()) ||
        data.id.toString().includes(search)
      );
    });
    setFelteredData(filtered.slice(0, PER_PAGE));
  };

  useEffect(() => {
    setFelteredData(studentData.slice(0, PER_PAGE));
  }, [studentData]);

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

  const ListOfStudents = ({
    felteredData,
    hundleUpdateStudent,
  }: {
    felteredData: StudentListProps[];
    hundleUpdateStudent: () => void;
  }) => {
    const respons = felteredData.map((student) => {
      return (
        <StudentsList
          key={student.id}
          user={student}
          relatedData={relatedData}
          hundleUpdateStudent={hundleUpdateStudent}
        />
      );
    });
    return <tbody>{respons}</tbody>;
  };

  return (
    <div className="flex h-full w-full flex-col rounded-md bg-light-bgw p-3 dark:bg-dark-bg">
      <SearchAndHeader
        title="All Students"
        handleSearch={handleSearch}
        relatedData={relatedData}
        hundleUpdateStudent={hundleUpdateStudent}
      />
      <table className="mb-3 min-w-full overflow-hidden rounded-md">
        <thead className="w-full rounded-full">
          <tr className="w-full border-b-[0.2px] border-gray-200 text-gray-400 dark:border-gray-950 dark:text-gray-600">
            {HeaderClass.map((header, index) => (
              <th
                key={index}
                className={`fist:px-0 px-4 py-2 text-left text-[10px] first:text-left last:text-center ${header.class}`}
              >
                {header.header.toLocaleUpperCase()}
              </th>
            ))}
          </tr>
        </thead>

        <ListOfStudents
          felteredData={felteredData}
          hundleUpdateStudent={hundleUpdateStudent}
        />
      </table>
      <Pagination total={totalSudents} handleChange={handlePagination} />
    </div>
  );
}

export default StudentClient;
