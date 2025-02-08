import React from "react";
import SearchAndHeaderServerSide from "../components/SearchAndHeaderServerSide";
import PaginationServerSide from "../components/PaginationServerSide";
import Table from "../components/Table";
import LessonsList from "../components/LessonsList";
import { prisma } from "@/app/libs/prisma";
import { PER_PAGE } from "@/app/libs/constants";

const HeaderClass = [
  {
    header: "Subject Name",
  },
  {
    header: "Classes",
    class: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    class: "hidden md:table-cell",
  },

  {
    header: "Action",
  },
];
async function Lesson({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const search = (await searchParams?.search) || "";
  const page = (await searchParams?.page) || 1;
  const searchAsNumber = Number.isNaN(Number(search))
    ? undefined
    : Number(search);

  const [lessons, totalLesson] = await prisma.$transaction([
    prisma.lesson.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              ...(searchAsNumber !== undefined ? [{ id: searchAsNumber }] : []),
            ],
          }
        : {},

      include: { teacher: true, class: { select: { name: true } } },
      skip: (+page - 1) * +PER_PAGE,
      take: PER_PAGE,
    }),
    prisma.lesson.count(),
  ]);

  const totalPage = Math.ceil(totalLesson / PER_PAGE);

  return (
    <div className="mx-auto p-4 flex flex-col w-full h-full">
      <SearchAndHeaderServerSide title="All Lessons" />
      <Table Lists={LessonsList} data={lessons} tableHeader={HeaderClass} />
      <PaginationServerSide totalPages={totalPage} />
    </div>
  );
}

export default Lesson;
