"use server";
import React from "react";

import Table from "../components/Table";
import TeachersList from "../components/TeachersList";
import PaginationServerSide from "../components/PaginationServerSide";
import { prisma } from "@/app/libs/prisma";
import SearchAndHeaderServerSide from "../components/SearchAndHeaderServerSide";
import { PER_PAGE } from "@/app/libs/constants";

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
  console.log("teacherId", queryParams);

  const { classId = "", search = "" } = queryParams;

  const p = page ? parseInt(page) : 1;

  const skip = (p - 1) * PER_PAGE;

  const [teachers, totalPosts] = await prisma.$transaction([
    prisma.teacher.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },

              { surname: { contains: search, mode: "insensitive" } },
              classId ? { classes: { some: { id: parseInt(classId) } } } : {},
            ],
          }
        : {},
      include: {
        classes: { select: { name: true, students: true } },
        subjects: true,
      },
      skip,
      take: PER_PAGE,
    }),
    prisma.teacher.count({
      where: search
        ? {
            OR: [
              search ? { name: { contains: search, mode: "insensitive" } } : {},
              search
                ? { surname: { contains: search, mode: "insensitive" } }
                : {},
              classId ? { classes: { some: { id: parseInt(classId) } } } : {},
            ],
          }
        : {},
    }),
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
