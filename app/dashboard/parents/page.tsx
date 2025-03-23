import Table from "../components/Table";
import Link from "next/link";
import SearchAndHeaderServerSide from "../components/SearchAndHeaderServerSide";
import { getParentsWithQuery } from "@/app/actions/parentAction";
import { PER_PAGE } from "@/app/libs/constants";
import PaginationServerSide from "../components/PaginationServerSide";
import FormContainer from "../components/FormContainer";
import { ParentSchemaType } from "@/app/libs/types";

const listofParent = (user: ParentSchemaType) => {
  return (
    <tr
      key={user.id}
      className="h-full w-full rounded-sm border-b-[0.1px] border-gray-200 text-[12px] text-gray-600 dark:border-gray-900 dark:text-gray-400"
    >
      <td className="ml-[6px] flex flex-col items-start justify-start sm:ml-2 md:ml-3">
        <p className="text-sm">{user.name}</p>
        <span className="text-xs text-slate-700">{user.email}</span>
      </td>

      <td className="hidden px-4 py-2 text-sm sm:table-cell">
        {user.students.map((student: any) => student.name).join(", ")}
      </td>
      <td className="hidden px-4 py-2 text-sm md:table-cell">{user.phone}</td>
      <td className="hidden px-4 py-2 text-sm md:table-cell">{user.address}</td>
      <td className="px-[10px] py-2 text-sm">
        <div className="flex items-center justify-center gap-2">
          {/* <Link href={`/dashboard/parents/${user.id}`}></Link> */}
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
    <div className="mx-auto flex h-full w-full flex-col rounded-md bg-light-bgw p-4 dark:bg-dark-bg">
      <SearchAndHeaderServerSide title="All Parents" table="parent" />
      <Table data={parents} tableHeader={HeaderClass} Lists={listofParent} />
      <PaginationServerSide totalPages={totalPages} />
    </div>
  );
}

export default Parents;
