"use server";
import React from "react";

import Table from "../components/Table";
import TeachersList from "../components/TeachersList";
import PaginationServerSide from "../components/PaginationServerSide";
import { prisma } from "@/app/libs/prisma";
import SearchAndHeaderServerSide from "../components/SearchAndHeaderServerSide";
import { Prisma } from "@prisma/client";
const PER_PAGE = 10;

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

  const { page, ...queryParams } = await searchParams;

  const p = page ? parseInt(page) : 1;

  const skip = (p - 1) * PER_PAGE;

  const query: Prisma.TeacherWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lessons = {
              some: {
                classId: parseInt(value),
              },
            };
            break;
          case "search":
            query.name = { contains: value, mode: "insensitive" };

            break;
          default:
            break;
        }
      }
    }
  }

  const [teachers, totalPosts] = await prisma.$transaction([
    prisma.teacher.findMany({
      where: query,
      include: { classes: true, subjects: true },
      skip,
      take: PER_PAGE,
    }),
    prisma.teacher.count({ where: query }),
  ]);

  const numberofPage = Math.ceil(totalPosts / PER_PAGE);

  return (
    <div className="mx-auto p-4 flex flex-col w-full h-full">
      <SearchAndHeaderServerSide title="All Teachers" />
      <Table data={teachers} tableHeader={HeaderClass} Lists={TeachersList} />
      <PaginationServerSide totalPages={numberofPage} />
    </div>
  );
}

export default Teachers;
