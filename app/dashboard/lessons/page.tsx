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
async function Lessons({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const searchResult = await searchParams;
  const search = searchResult.search || "";
  const page = searchResult?.page || 1;
  const searchAsNumber = Number.isNaN(Number(search))
    ? undefined
    : Number(search);

  const query: any = {};

  if (search !== undefined && search.length > 0) {
    query.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { class: { name: { contains: search, mode: "insensitive" } } },
    ];
  }

  if (searchAsNumber !== undefined && searchAsNumber > 0) {
    query.id = searchAsNumber;
  }

  const [lessons, totalLesson] = await prisma.$transaction([
    prisma.lesson.findMany({
      where: query,

      include: { teacher: true, class: { select: { name: true } } },
      skip: (+page - 1) * +PER_PAGE,
      take: PER_PAGE,
    }),
    prisma.lesson.count({ where: query }),
  ]);
  const totalPage = Math.ceil(totalLesson / PER_PAGE);

  return (
    <div className="mx-auto flex h-full w-full flex-col p-4">
      <SearchAndHeaderServerSide title="All Lessons" />
      <Table Lists={LessonsList} data={lessons} tableHeader={HeaderClass} />
      <PaginationServerSide totalPages={totalPage} />
    </div>
  );
}

export default Lessons;
