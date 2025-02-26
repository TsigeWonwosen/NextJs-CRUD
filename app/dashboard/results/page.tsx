import React from "react";
import SearchAndHeaderServerSide from "../components/SearchAndHeaderServerSide";
import PaginationServerSide from "../components/PaginationServerSide";
import Table from "../components/Table";
import { prisma } from "@/app/libs/prisma";
import FormModel from "../components/FormModel";
import { PER_PAGE } from "@/app/libs/constants";
import { ResultList } from "@/app/libs/types";
import { getServerSession } from "next-auth";
import { Options } from "@/app/libs/auth";

export default async function Results({
  searchParams,
}: {
  searchParams: { [value: string]: string | undefined };
}) {
  const session = await getServerSession(Options);
  const role = session?.user?.role;

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
    ...(role === "admin" || role === "teacher"
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
      className="h-full w-full rounded-sm border border-transparent even:bg-slate-900 hover:bg-gray-700"
    >
      <td className="flex items-center gap-4 p-4">{item.student.name}</td>
      <td>{item.assignment?.title || "-"}</td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(item.assignment?.startDate)}
      </td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(item.assignment?.dueDate)}
      </td>
      <td className="hidden md:table-cell">{item.score.toFixed()}</td>
      <td>
        <div className="flex items-center justify-center gap-2">
          {(role === "admin" || role === "teacher") && (
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
  const { search = "" } = await searchParams;
  const where: any = {};
  if (search) {
    where.OR = [
      { assignment: { title: { contains: search, mode: "insensitive" } } },
      {
        student: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
    ];
  }
  const results = await prisma.result.findMany({
    where: where,
    include: { assignment: true, student: true, exam: true },
  });

  const numberofPage = Math.ceil(results.length / PER_PAGE);
  return (
    <div className="mx-auto flex h-full w-full flex-col p-4">
      <SearchAndHeaderServerSide title="All Results" />
      <Table Lists={renderRow} data={results} tableHeader={columns} />
      <PaginationServerSide totalPages={numberofPage} />
    </div>
  );
}
