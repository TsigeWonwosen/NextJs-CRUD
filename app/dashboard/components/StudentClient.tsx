"use client";
import React, { useEffect, useState } from "react";
import SearchAndHeader from "./SearchAndHeader";
import Table from "./Table";
import StudentsList from "./StudentsList";
import { Class, Student } from "@prisma/client";
import Pagination from "./Pagination";
import {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} from "../../actions/studentActions";

const PER_PAGE = 10;
type StudentType = Student & { class: Class };

function StudentClient({
  students,
  totalSudents,
}: {
  students: StudentType[];
  totalSudents: number;
}) {
  const [studentData, setStudentData] = useState<StudentType[]>(
    students.slice(0, PER_PAGE)
  );
  const [felteredData, setFelteredData] = useState<StudentType[]>(studentData);

  useEffect(() => {
    const fetchStudents = async () => {};
    getStudents();
  }, []);

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

  const handleClick = async (id: string) => {
    await deleteStudent(id);
  };

  const handleClickUpdate = async (id: string, data: Student) => {
    await updateStudent(id, data);
  };

  const handleAdd = async () => {
    await createStudent();
  };

  return (
    <div className="w-full h-full mx-auto p-4 flex flex-col">
      <SearchAndHeader title="All Students" handleSearch={handleSearch} />
      <Table
        Lists={StudentsList}
        tableHeader={HeaderClass}
        data={felteredData}
      />

      <Pagination total={totalSudents} handleChange={handlePagination} />
    </div>
  );
}

export default StudentClient;
