import React from "react";
import SearchAndHeaderServerSide from "../components/SearchAndHeaderServerSide";
import {
  Announcement,
  Assignment,
  Class,
  Lesson,
  Result,
} from "@prisma/client";
import { role } from "@/app/utils/data";
import PaginationServerSide from "../components/PaginationServerSide";
import Table from "../components/Table";
import { prisma } from "@/app/libs/prisma";
import FormModel from "../components/FormModel";
import { PER_PAGE } from "@/app/libs/constants";

type assignmentList = Assignment & { result: Result[] } & { lesson: Lesson };

const columns = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Teacher",
    accessor: "teacher",
  },
  {
    header: "Start Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "End Date",
    accessor: "date",
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
const renderRow = (item: assignmentList) => (
  <tr
    key={item.id}
    className="w-full h-full border border-transparent rounded-sm even:bg-slate-900 hover:bg-gray-700"
  >
    <td className="flex items-center gap-4 p-4">{item.title}</td>
    <td className="hidden md:table-cell">{item.lesson.name || "-"}</td>
    <td className="flex items-center gap-4 p-4">{item.lesson.teacherId}</td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-US").format(item.lessonId)}
    </td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-US").format(item.dueDate)}
    </td>
    <td>
      <div className="flex items-center justify-center gap-2">
        {role === "admin" && (
          <>
            <FormModel studentId={item.id} table="assignment" type="update" />
            <FormModel studentId={item.id} table="assignment" type="delete" />
          </>
        )}
      </div>
    </td>
  </tr>
);
export default async function Assignments({
  searchParams,
}: {
  searchParams: { [value: string]: string | undefined };
}) {
  const { search = "" } = await searchParams;
  const announcement = await prisma.assignment.findMany({
    where: {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { lesson: { name: { contains: search, mode: "insensitive" } } },
      ],
    },
    include: { lesson: true, results: true },
  });

  const numberofPage = Math.ceil(announcement.length / PER_PAGE);
  return (
    <div className="mx-auto p-4 flex flex-col w-full h-ful">
      <SearchAndHeaderServerSide title="All Assignments" />
      <Table Lists={renderRow} data={announcement} tableHeader={columns} />
      <PaginationServerSide totalPages={numberofPage} />
    </div>
  );
}
