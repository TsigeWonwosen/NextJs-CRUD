"use client";
import React, { useState } from "react";
import FormModel from "./FormModel";
import { usePathname, useRouter } from "next/navigation";
import { Filter, Search, SortAsc } from "lucide-react";
import { useSession } from "next-auth/react";

function SearchAndHeaderServerSide({ title }: { title: string }) {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const session = useSession();

  const role = session && session.data?.user.role;
  const path = usePathname();
  let newPath: string = path.split("/")[2].slice(0, -1);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const encodedSearch = encodeURI(search);
    params.set("search", encodedSearch);
    router.push(`${window.location.pathname}?${params}`);
    setSearch("");
  };

  return (
    <div className="flex flex-col justify-start items-start mb-3 md:flex-row md:justify-between md:items-start">
      <h4 className="text-left text-base text-slate-500  mb-2 w-auto md:flex-1 md:mb-0">
        {title}
      </h4>
      <section className="flex justify-between items-center gap-2 w-full h-full md:w-auto md:gap-0">
        <form
          onSubmit={handleSubmit}
          className="flex justify-between  items-center text-slate-200 rounded-full  py-[1px] gap-2 max-w-[250px] sm:w-full "
        >
          <section className="flex items-center justify-between flex-1 h-full bg-slate-900 rounded-full mr-[2px]  px-2 relative">
            <Search className=" rounded-l-full  w-5 h-5 mr-3 object-cover opacity-60 absolute top-1/2 left-[6px] -translate-y-1/2 translate cursor-pointer strokeWidth={0}" />
            <input
              className="outline-none  bg-transparent text-sm ml-2 px-5 py-1.5 w-full h-full text-slate-200/50 rounded-md  [&::-webkit-search-cancel-button]:bg-red-500"
              type="search"
              placeholder=" Search . . ."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </section>
        </form>

        <div className="flex justify-center items-center ml-2 gap-1 w-[150px] ">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200/80">
            <Filter size={"15px"} />
          </button>
          <button className="w-8 h-8 flex justify-center items-center  rounded-full bg-[#7dd37b]">
            <SortAsc size={"15px"} />
          </button>
          {role === "admin" && <FormModel table={newPath} type="create" />}
        </div>
      </section>
    </div>
  );
}

export default SearchAndHeaderServerSide;
