"use client";
import { Filter, SortAsc, SortDesc, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function SearchHeader() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(true);
  const router = useRouter();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const encodedSearch = encodeURI(search);
    params.set("search", encodedSearch);
    router.push(`${window.location.pathname}?${params}`);
    setSearch("");
  };
  useEffect(() => {
    let sortDirection = sort ? "asc" : "desc";
    router.push(`?sort=${sortDirection}`);
  }, [sort]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex w-full min-w-[250px] items-center justify-between gap-2 rounded-full py-[1px] text-slate-200 sm:w-full"
      >
        <section className="relative mr-[2px] flex h-full flex-1 items-center justify-between rounded-full bg-slate-900 px-2">
          <Search className="translate strokeWidth={0} absolute left-[6px] top-1/2 mr-3 h-5 w-5 -translate-y-1/2 cursor-pointer rounded-l-full object-cover opacity-60" />
          <input
            className="ml-2 h-full w-full rounded-md bg-transparent px-5 py-1.5 text-sm text-slate-200/50 outline-none [&::-webkit-search-cancel-button]:bg-red-500"
            type="search"
            placeholder=" Search . . ."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </section>
      </form>
      <div className="flex items-center justify-center gap-x-1">
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200/80">
          <Filter size={"15px"} />
        </button>
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7dd37b]">
          {sort ? (
            <SortAsc
              size={"15px"}
              onClick={() => setSort((prvStat) => !prvStat)}
            />
          ) : (
            <SortDesc
              size={"15px"}
              onClick={() => setSort((prvStt) => !prvStt)}
            />
          )}
        </button>
      </div>
    </>
  );
}

export default SearchHeader;
