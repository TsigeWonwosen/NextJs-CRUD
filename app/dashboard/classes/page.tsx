import React from "react";
import SearchAndHeaderServerSide from "../components/SearchAndHeaderServerSide";
import { role } from "@/app/utils/data";
import PaginationServerSide from "../components/PaginationServerSide";
import Table from "../components/Table";
import { prisma } from "@/app/libs/prisma";
import { PER_PAGE } from "@/app/libs/constants";
import { ClassProps } from "@/app/libs/types";
import FormContainer from "../components/FormContainer";

const columns = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Capacity",
    accessor: "capacity",
  },
  {
    header: "Lessons",
    accessor: "lessons",
    className: "hidden md:table-cell",
  },
  {
    header: "Supervisor",
    accessor: "supervisor",
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
const renderRow = (item: ClassProps) => (
  <tr
    key={item.id}
    className="h-full w-full rounded-sm border-b-[0.1px] border-gray-200 text-[12px] text-gray-600 dark:border-gray-900 dark:text-gray-400"
  >
    <td className="flex items-center gap-4 p-4">{item.name}</td>
    <td className="hidden md:table-cell">{item.capacity}</td>
    <td className="hidden md:table-cell">
      {item.lessons.map((lesson) => lesson.name).join(", ")}
    </td>
    <td>{item.supervisorId || "-"}</td>
    <td>
      <div className="flex items-center justify-center gap-2">
        {role === "admin" && (
          <>
            <FormContainer
              id={item.id}
              table="class"
              type="update"
              data={item}
            />
            <FormContainer id={item.id} table="class" type="delete" />
          </>
        )}
      </div>
    </td>
  </tr>
);
export default async function Classes({
  searchParams,
}: {
  searchParams: { [value: string]: string | undefined };
}) {
  const { search = "" } = await searchParams;
  const classes: ClassProps[] = await prisma.class.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { supervisor: { name: { contains: search, mode: "insensitive" } } },
      ],
    },
    include: {
      supervisor: true,
      lessons: true,
      students: true,
      grade: true,
      events: true,
      announcements: true,
    },
  });

  const numberofPage = Math.ceil(classes.length / PER_PAGE);
  return (
    <div className="mx-auto flex h-full w-full flex-col rounded-md bg-light-bgw p-4 dark:bg-dark-bg">
      <SearchAndHeaderServerSide title="All Classes" table="class" />
      <Table Lists={renderRow} data={classes} tableHeader={columns} />
      <PaginationServerSide totalPages={numberofPage} />
    </div>
  );
}
