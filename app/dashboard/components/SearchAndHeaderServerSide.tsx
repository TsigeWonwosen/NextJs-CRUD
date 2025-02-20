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
    <div className="flex flex-col justify-start items-start mb-3 md:flex-row md:justify-between md:items-start">
      <h4 className="text-left text-base text-slate-500  mb-2 w-auto md:flex-1 md:mb-0">
        {title}
      </h4>
      <section className="flex justify-right items-center gap-2 px-2 w-full h-full md:w-auto md:gap-1 ">
        <SearchHeader />
        {role === "admin" && <FormContainer table={table} type="create" />}
      </section>
    </div>
  );
}

export default SearchAndHeaderServerSide;
