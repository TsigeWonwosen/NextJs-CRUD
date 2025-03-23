import React from "react";
import SearchAndHeaderServerSide from "../components/SearchAndHeaderServerSide";
import PaginationServerSide from "../components/PaginationServerSide";
import Table from "../components/Table";
import { prisma } from "@/app/libs/prisma";
import { PER_PAGE } from "@/app/libs/constants";
import { EventList } from "@/app/libs/types";
import { getServerSession } from "next-auth";
import { Options } from "@/app/libs/auth";
import FormContainer from "../components/FormContainer";

export default async function Events({
  searchParams,
}: {
  searchParams: { [value: string]: string | undefined };
}) {
  const { search = "" } = await searchParams;
  const session = await getServerSession(Options);
  const role = session?.user?.role
    ? session?.user?.role.toLocaleLowerCase()
    : "admin";

  const columns = [
    {
      header: "Title",
      accessor: "title",
    },
    {
      header: "Description",
      accessor: "discription",
    },
    {
      header: "Start Date",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    {
      header: "End Date",
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

  const renderRow = (item: EventList) => (
    <tr
      key={item.id}
      className="h-full w-full rounded-sm border-b-[0.1px] border-gray-200 text-[12px] text-gray-600 dark:border-gray-900 dark:text-gray-400"
    >
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      <td>{item.description || "-"}</td>
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
              <FormContainer
                id={item.id}
                table="event"
                type="update"
                data={item}
              />
              <FormContainer id={item.id} table="event" type="delete" />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const events = await prisma.event.findMany({
    where: {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
    },
  });

  const numberofPage = Math.ceil(events.length / PER_PAGE);
  return (
    <div className="mx-auto flex h-full w-full flex-col rounded-md bg-light-bgw p-4 dark:bg-dark-bg">
      <SearchAndHeaderServerSide title="All Events" table="event" />
      <Table Lists={renderRow} data={events} tableHeader={columns} />
      <PaginationServerSide totalPages={numberofPage} />
    </div>
  );
}
