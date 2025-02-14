import React from "react";
import SearchAndHeaderServerSide from "../components/SearchAndHeaderServerSide";
import { Announcement, Class } from "@prisma/client";
import { role } from "@/app/utils/data";
import PaginationServerSide from "../components/PaginationServerSide";
import Table from "../components/Table";
import { prisma } from "@/app/libs/prisma";
import FormModel from "../components/FormModel";
import { PER_PAGE } from "@/app/libs/constants";
import { ResultList } from "@/app/libs/types";

const columns = [
  {
    header: "Student Name ",
    accessor: "student name ",
  },
  {
    header: "Assignment",
    accessor: "assignment",
  },
  {
    header: "Start Time",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Ende Time",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Score",
    accessor: "score",
    className: "hidden md:table-cell",
  },
  ...(role === "admin"
    ? [
        {
          header: "Actions",
          accessor: "action",
        },
      ]
    : []),
];
const renderRow = (item: ResultList) => (
  <tr
    key={item.id}
    className="w-full h-full border border-transparent rounded-sm even:bg-slate-900 hover:bg-gray-700"
  >
    <td className="flex items-center gap-4 p-4">{item.student.name}</td>
    <td>{item.assignment.title || "-"}</td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-US").format(item.assignment.startDate)}
    </td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-US").format(item.assignment.dueDate)}
    </td>
    <td className="hidden md:table-cell">{item.score.toFixed()}</td>
    <td>
      <div className="flex items-center justify-center gap-2">
        {role === "admin" && (
          <>
            <FormModel
              studentId={item.id}
              table="result"
              type="update"
              data={item}
            />
            <FormModel studentId={item.id} table="result" type="delete" />
          </>
        )}
      </div>
    </td>
  </tr>
);
export default async function Results({
  searchParams,
}: {
  searchParams: { [value: string]: string | undefined };
}) {
  const { search = "" } = await searchParams;
  const results = await prisma.result.findMany({
    where: {
      OR: [
        { assignment: { title: { contains: search, mode: "insensitive" } } },
        {
          student: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      ],
    },
    include: { assignment: true, student: true, exam: true },
  });

  const numberofPage = Math.ceil(results.length / PER_PAGE);
  return (
    <div className="mx-auto p-4 flex flex-col w-full h-full">
      <SearchAndHeaderServerSide title="All Announcements" />
      <Table Lists={renderRow} data={results} tableHeader={columns} />
      <PaginationServerSide totalPages={numberofPage} />
    </div>
  );
}
