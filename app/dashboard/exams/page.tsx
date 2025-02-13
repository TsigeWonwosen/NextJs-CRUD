import React from "react";
import SearchAndHeaderServerSide from "../components/SearchAndHeaderServerSide";
import { role } from "@/app/utils/data";
import PaginationServerSide from "../components/PaginationServerSide";
import Table from "../components/Table";
import { prisma } from "@/app/libs/prisma";
import FormModel from "../components/FormModel";
import { PER_PAGE } from "@/app/libs/constants";
import { ExamList } from "@/app/libs/types";
import { getServerSession } from "next-auth";
import { Options } from "@/app/libs/auth";

export default async function Exams({
  searchParams,
}: {
  searchParams: { [value: string]: string | undefined };
}) {
  const session = await getServerSession(Options);
  const role = session?.user?.role.toLocaleLowerCase();
  const { search = "" } = await searchParams;

  const columns = [
    {
      header: "Title",
      accessor: "title",
    },
    {
      header: "Lesson",
      accessor: "lesson",
    },
    {
      header: "Start Time",
      accessor: "start time",
      className: "hidden md:table-cell",
    },
    {
      header: "End Time",
      accessor: "end time",
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
  const renderRow = (item: ExamList) => (
    <tr
      key={item.id}
      className="w-full h-full border border-transparent rounded-sm even:bg-slate-900 hover:bg-gray-700"
    >
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      <td>{item.lesson.name}</td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(item.startTime)}
      </td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(item.endTime)}
      </td>
      <td>
        <div className="flex items-center justify-center gap-2">
          {role === "admin" && (
            <>
              <FormModel
                studentId={item.id}
                table="exam"
                type="update"
                data={item}
              />
              <FormModel studentId={item.id} table="exam" type="delete" />
            </>
          )}
        </div>
      </td>
    </tr>
  );
  const exams = await prisma.exam.findMany({
    where: {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { lesson: { name: { contains: search, mode: "insensitive" } } },
      ],
    },
    include: { lesson: true, results: true },
  });

  const numberofPage = Math.ceil(exams.length / PER_PAGE);
  return (
    <div className="mx-auto p-4 flex flex-col w-full h-full">
      <SearchAndHeaderServerSide title="All Exams" />
      <Table Lists={renderRow} data={exams} tableHeader={columns} />
      <PaginationServerSide totalPages={numberofPage} />
    </div>
  );
}
