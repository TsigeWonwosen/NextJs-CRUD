"use client";
import React from "react";
import { Filter, Search, SortAsc } from "lucide-react";
import { useSession } from "next-auth/react";
import FormModelClient from "./clientSideComponets/FormModelClient";

function SearchAndHeader({
  title,
  handleSearch,
  relatedData,
  hundleUpdateStudent,
}: {
  title: string;
  handleSearch: (search: string) => void;
  relatedData: any;
  hundleUpdateStudent: () => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const session = useSession();
  const role = session?.data?.user?.role.toLocaleLowerCase();

  const handleSearchChange = () => {
    if (inputRef.current) {
      handleSearch(inputRef?.current?.value);
    }
  };

  return (
    <div className="mb-3 flex h-full flex-col items-start justify-start md:flex-row md:items-start md:justify-between">
      <h4 className="mb-2 w-auto text-left text-base text-slate-500 md:mb-0 md:flex-1">
        {title}
      </h4>
      <section className="flex h-full w-full items-center justify-between gap-2 md:w-auto md:gap-0">
        <div className="flex max-w-[250px] items-center justify-between gap-2 rounded-full bg-slate-800 py-[1px] text-slate-200 sm:w-full">
          <section className="relative mr-[2px] flex h-full flex-1 items-center justify-between rounded-full bg-slate-900 px-2">
            <Search className="translate absolute left-[6px] top-1/2 mr-3 h-5 w-5 -translate-y-1/2 cursor-pointer rounded-l-full opacity-60" />

            <input
              className="h-full w-full appearance-none rounded-md bg-transparent px-5 py-[6px] text-sm text-slate-200/50 outline-none"
              type="search"
              placeholder=" Search ..."
              ref={inputRef}
              onChange={handleSearchChange}
            />
          </section>
        </div>

        <div className="item-center flex h-full w-full max-w-[120px] justify-center pl-2">
          <div className="flex h-full w-full items-center justify-between gap-1">
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200/80">
              <Filter size={"16px"} />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7dd37b]">
              <SortAsc size={"16px"} />
            </button>
          </div>

          {role === "admin" && (
            <FormModelClient
              table="student"
              type="create"
              relatedData={relatedData}
              hundleUpdateStudent={hundleUpdateStudent}
            />
          )}
        </div>
      </section>
    </div>
  );
}

export default SearchAndHeader;
