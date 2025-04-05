import React from "react";
import SearchAndHeaderServerSide from "../components/SearchAndHeaderServerSide";
import { Attendance } from "@prisma/client";
import { role } from "@/app/utils/data";
import PaginationServerSide from "../components/PaginationServerSide";
import Table from "../components/Table";
import { prisma } from "@/app/libs/prisma";
import FormModel from "../components/FormModel";
import { PER_PAGE } from "@/app/libs/constants";
import { AttendanceList } from "@/app/libs/types";

const columns = [
  {
    header: "Date",
    accessor: "date",
  },
  {
    header: "Present",
    accessor: "present",
  },
  {
    header: "Student Name",
    accessor: "student name",
    className: "hidden md:table-cell",
  },
  {
    header: "Lesson",
    accessor: "lesson",
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
const renderRow = (item: AttendanceList) => (
  <tr
    key={item.id}
    className="h-full w-full rounded-sm border-b-[0.1px] border-gray-200 text-[12px] text-gray-600 dark:border-gray-900 dark:text-gray-400"
  >
    <td className="flex items-center gap-4 p-4">
      {new Intl.DateTimeFormat("en-US").format(item.date)}
    </td>
    <td>{item.present ? "True" : "False"}</td>
    <td className="hidden md:table-cell">{item.student.name}</td>
    <td className="hidden md:table-cell">{item.lesson.name}</td>
    <td>
      <div className="flex items-center justify-center gap-2">
        {role === "admin" && (
          <>
            <FormModel
              id={item.id}
              table="attendace"
              type="update"
              data={item}
            />
            <FormModel id={item.id} table="attendace" type="delete" />
          </>
        )}
      </div>
    </td>
  </tr>
);
export default async function Attendaces({
  searchParams,
}: {
  searchParams: { [value: string]: string | undefined };
}) {
  const { search = "" } = await searchParams;
  const attendace: AttendanceList[] = await prisma.attendance.findMany({
    where: {
      OR: [
        { student: { name: { contains: search, mode: "insensitive" } } },
        { lesson: { name: { contains: search, mode: "insensitive" } } },
      ],
    },
    include: { student: true, lesson: true },
  });

  const numberofPage = Math.ceil(attendace.length / PER_PAGE);
  return (
    <div className="mx-auto flex h-full w-full flex-col justify-start rounded-md bg-light-bgw p-4 dark:bg-dark-bg">
      <SearchAndHeaderServerSide title="All Attendances" table="attendance" />
      <Table Lists={renderRow} data={attendace} tableHeader={columns} />
      <PaginationServerSide totalPages={numberofPage} />
    </div>
  );
}
