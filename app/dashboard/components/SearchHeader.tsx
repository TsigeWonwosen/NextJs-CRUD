"use client";
import { Filter, SortAsc, SortDesc, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function SearchHeader() {
  const [search, setSearch] = useState("");
  const [isAsc, setIsAsc] = useState(true);
  const router = useRouter();

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
    <>
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
      <div className="flex justify-center items-center gap-x-1">
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200/80">
          <Filter size={"15px"} />
        </button>
        <button className="w-8 h-8 flex justify-center items-center  rounded-full bg-[#7dd37b]">
          {isAsc ? (
            <SortAsc
              size={"15px"}
              onClick={() => setIsAsc((prvState) => !prvState)}
            />
          ) : (
            <SortDesc
              size={"15px"}
              onClick={() => setIsAsc((prvState) => !prvState)}
            />
          )}
        </button>
      </div>
    </>
  );
}

export default SearchHeader;
