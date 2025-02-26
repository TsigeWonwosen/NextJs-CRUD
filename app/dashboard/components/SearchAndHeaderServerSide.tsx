import { getServerSession } from "next-auth";
import FormContainer from "./FormContainer";
import { Options } from "@/app/libs/auth";
import SearchHeader from "./SearchHeader";

async function SearchAndHeaderServerSide({
  title,
  table,
}: {
  title: string;
  table: string;
}) {
  const session = await getServerSession(Options);
  let role = session?.user.role.toLocaleLowerCase();
  return (
    <div className="mb-3 flex flex-col items-start justify-start md:flex-row md:items-start md:justify-between">
      <h4 className="mb-2 w-auto text-left text-base text-slate-500 md:mb-0 md:flex-1">
        {title}
      </h4>
      <section className="justify-right flex h-full w-full items-center gap-2 px-2 md:w-auto md:gap-1">
        <SearchHeader />
        {role === "admin" && <FormContainer table={table} type="create" />}
      </section>
    </div>
  );
}

export default SearchAndHeaderServerSide;
