import React from "react";

import Table from "../components/Table";
import TeachersList from "../components/TeachersList";
import PaginationServerSide from "../components/PaginationServerSide";
import SearchAndHeaderServerSide from "../components/SearchAndHeaderServerSide";
import { PER_PAGE } from "@/app/libs/constants";
import { getTeachersWithQuery } from "@/app/actions/teacherAction";

async function Teachers({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
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

  const searchParam = await searchParams;

  const { teachers, teacherCounts } = await getTeachersWithQuery(searchParam);
  const numberofPage = Math.ceil(teacherCounts / PER_PAGE);

  return (
    <div className="mx-auto flex h-full w-full flex-col p-4">
      <SearchAndHeaderServerSide title="All Teachers" table="teacher" />
      <Table data={teachers} tableHeader={HeaderClass} Lists={TeachersList} />
      <PaginationServerSide totalPages={numberofPage} />
    </div>
  );
}

export default Teachers;
