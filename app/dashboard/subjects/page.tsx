import React from "react";
import SearchAndHeaderServerSide from "../components/SearchAndHeaderServerSide";
import { prisma } from "@/app/libs/prisma";
import PaginationServerSide from "../components/PaginationServerSide";
import Table from "../components/Table";
import SubjectsList from "../components/SubjectList";
import { PER_PAGE } from "@/app/libs/constants";

async function Subjects({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const searchRes = await searchParams;
  const search = searchRes?.search || "";
  const page = searchRes?.page || 1;

  const searchAsNumber = Number.isNaN(Number(search))
    ? undefined
    : Number(search);

  const [subjects, totalSubject] = await prisma.$transaction([
    prisma.subject.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              ...(searchAsNumber !== undefined ? [{ id: searchAsNumber }] : []),
            ],
          }
        : {},

      include: { teachers: true, lessons: true },
      skip: (+page - 1) * PER_PAGE,
      take: PER_PAGE,
    }),
    prisma.subject.count(),
  ]);

  const HeaderClass = [
    {
      header: "Info",
    },
    {
      header: "Lessons",
      class: "hidden md:table-cell",
    },
    {
      header: "Dates",
      class: "hidden md:table-cell",
    },
    {
      header: "Teachers",
      class: "hidden sm:table-cell",
    },

    {
      header: "Action",
    },
  ];

  const numberOfPage = Math.ceil(totalSubject / PER_PAGE);
  return (
    <div className="mx-auto flex h-full w-full flex-col bg-light-bgw p-4 dark:bg-dark-bg">
      <SearchAndHeaderServerSide title="All Subjects" table="subject" />
      <Table Lists={SubjectsList} data={subjects} tableHeader={HeaderClass} />
      <PaginationServerSide totalPages={numberOfPage} />
    </div>
  );
}

export default Subjects;
