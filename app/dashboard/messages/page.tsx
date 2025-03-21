import React from "react";
import SearchAndHeaderServerSide from "../components/SearchAndHeaderServerSide";
import { Announcement, Class } from "@prisma/client";
import { role } from "@/app/utils/data";
import PaginationServerSide from "../components/PaginationServerSide";
import Table from "../components/Table";
import { prisma } from "@/app/libs/prisma";
import FormModel from "../components/FormModel";
import { PER_PAGE } from "@/app/libs/constants";
import FormContainer from "../components/FormContainer";

type AnnouncementList = Announcement & { class: Class };

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
    header: "Date",
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
const renderRow = (item: AnnouncementList) => (
  <tr
    key={item.id}
    className="h-full w-full rounded-sm border border-transparent even:bg-slate-900 hover:bg-gray-700"
  >
    <td className="flex items-center gap-4 p-4">{item.title}</td>
    <td>{item.class?.name || "-"}</td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-US").format(item.date)}
    </td>
    <td>
      <div className="flex items-center justify-center gap-2">
        {role === "admin" && (
          <>
            <FormContainer table="message" type="update" data={item} />
            <FormContainer table="message" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);
export default async function Messages({
  searchParams,
}: {
  searchParams: { [value: string]: string | undefined };
}) {
  const { search = "" } = await searchParams;
  const announcement = await prisma.announcement.findMany({
    where: {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { class: { name: { contains: search, mode: "insensitive" } } },
      ],
    },
  });

  const numberofPage = Math.ceil(announcement.length / PER_PAGE);
  return (
    <div className="mx-auto flex h-full w-full flex-col p-4">
      <SearchAndHeaderServerSide title="All Messages" table="message" />
      <Table Lists={renderRow} data={announcement} tableHeader={columns} />
      <PaginationServerSide totalPages={numberofPage} />
    </div>
  );
}
