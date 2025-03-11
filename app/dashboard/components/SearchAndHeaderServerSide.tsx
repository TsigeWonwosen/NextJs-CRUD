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
    <div className="mb-3 flex h-full w-full flex-col items-start justify-start overflow-visible md:flex-row md:justify-between">
      <section className="flex">
        <h4 className="mb-2 text-left text-base text-slate-500">{title}</h4>
      </section>
      <section className="flex items-center gap-2 px-2 md:gap-1">
        <SearchHeader />
        {role === "admin" && <FormContainer table={table} type="create" />}
      </section>
    </div>
  );
}

export default SearchAndHeaderServerSide;
