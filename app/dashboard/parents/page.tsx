import Table from "../components/Table";
import Link from "next/link";
import SearchAndHeaderServerSide from "../components/SearchAndHeaderServerSide";
import { Parent } from "@prisma/client";
import { getParentsWithQuery } from "@/app/actions/parentAction";
import { PER_PAGE } from "@/app/libs/constants";
import PaginationServerSide from "../components/PaginationServerSide";
import FormContainer from "../components/FormContainer";

const listofParent = (user: Parent) => {
  return (
    <tr
      key={user.id}
      className="flex-grow-1 h-full w-full rounded-sm border border-transparent even:bg-slate-900 hover:bg-gray-700"
    >
      <td className="ml-[6px] flex flex-col items-start justify-start sm:ml-2 md:ml-3">
        <p className="text-sm">{user.name}</p>
        <span className="text-xs text-slate-700">{user.email}</span>
      </td>

      <td className="hidden px-4 py-2 text-sm sm:table-cell">{user.name}</td>
      <td className="hidden px-4 py-2 text-sm md:table-cell">{user.phone}</td>
      <td className="hidden px-4 py-2 text-sm md:table-cell">{user.address}</td>
      <td className="px-4 py-2 text-sm">
        <div className="flex items-center justify-center gap-1">
          <Link href={`/dashboard/teachers/${user.id}`}></Link>
          <FormContainer
            table="parent"
            type="update"
            id={user.id}
            data={user}
          />

          <FormContainer
            table="parent"
            type="delete"
            id={user.id}
            data={user}
          />
        </div>
      </td>
    </tr>
  );
};

async function Parents({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const searchParam = await searchParams;
  const { parents, totalparent } = await getParentsWithQuery(searchParam);

  const HeaderClass = [
    {
      header: "Info",
    },
    {
      header: "students",
      class: "hidden md:table-cell",
    },
    {
      header: "Phone",
      class: "hidden md:table-cell",
    },

    {
      header: "Address",
      class: "hidden md:table-cell",
    },
    {
      header: "Action",
    },
  ];
  const totalPages = Math.ceil(totalparent / PER_PAGE);
  return (
    <div className="mx-auto flex h-full w-full flex-col p-4">
      <SearchAndHeaderServerSide title="All Parents" table="parent" />
      <Table data={parents} tableHeader={HeaderClass} Lists={listofParent} />
      <PaginationServerSide totalPages={totalPages} />
    </div>
  );
}

export default Parents;
