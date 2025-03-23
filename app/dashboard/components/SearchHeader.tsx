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
  }, [sort, router]);
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex min-w-[250px] items-center justify-between gap-2 rounded-md py-[1px] text-slate-200 sm:w-full"
      >
        <section className="relative mr-[2px] flex h-full flex-1 items-center justify-between rounded-md bg-light-bg px-2 dark:bg-slate-900">
          <Search className="absolute left-[6px] top-1/2 mr-3 h-5 w-5 -translate-y-1/2 cursor-pointer rounded-l-full object-cover text-light-secondary opacity-60" />
          <input
            className="ml-2 h-full w-full rounded-md bg-transparent px-5 py-[10px] text-sm text-light-text outline-none dark:text-dark-text [&::-webkit-search-cancel-button]:bg-red-500"
            type="search"
            placeholder=" Search ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </section>
      </form>
      <div className="flex items-center justify-center gap-x-1">
        <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 hover:border-[#010A1F]/50 dark:border-gray-900/90">
          <Filter size={"15px"} />
        </button>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-md border border-[#010A1F]/50 hover:border-[#010A1F]/50 dark:border-gray-900/90"
          onClick={() => setSort((prvStat) => !prvStat)}
        >
          {sort ? <SortAsc size={"15px"} /> : <SortDesc size={"15px"} />}
        </button>
      </div>
    </>
  );
}

export default SearchHeader;
