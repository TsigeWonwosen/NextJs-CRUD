"use client";
import Image from "next/image";
import React from "react";
import FormModel from "./FormModel";
import { Search } from "lucide-react";
import { useSession } from "next-auth/react";

function SearchAndHeader({
  title,
  handleSearch,
}: {
  title: string;
  handleSearch: (search: string) => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const session = useSession();
  const role = session?.data?.user?.role;
  const handleSearchChange = () => {
    if (inputRef.current) {
      handleSearch(inputRef?.current?.value);
    }
  };

  return (
    <div className="flex flex-col justify-start items-start mb-3 md:flex-row md:justify-between md:items-start">
      <h4 className="text-left text-base text-slate-500  mb-2 w-auto md:flex-1 md:mb-0">
        {title}
      </h4>
      <section className="flex justify-between items-center gap-2 w-full h-full md:w-auto md:gap-0">
        <div className="flex justify-between  items-center bg-slate-800 text-slate-200 rounded-full  py-[1px] gap-2 max-w-[250px] sm:w-full">
          <section className="flex items-center justify-between flex-1 h-full bg-slate-900 rounded-full mr-[2px]  px-2 relative">
            <Search className=" rounded-l-full  w-5 h-5 mr-3  opacity-60 absolute top-1/2 left-[6px] -translate-y-1/2 translate cursor-pointer" />

            <input
              className="appearance-none outline-none  bg-transparent text-sm px-5 py-1 w-full h-full text-slate-200/50 rounded-md "
              type="search"
              placeholder=" Search ..."
              ref={inputRef}
              onChange={handleSearchChange}
            />
          </section>
        </div>

        <div className="flex justify-center items-center ml-2 gap-1 w-[150px] ">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-200 appearance-none">
            <Image
              src="/filter.png"
              alt=""
              width={14}
              height={14}
              className="object-cover "
            />
          </button>
          <button className="w-8 h-8 flex justify-center items-center  rounded-full bg-[#7dd37b]">
            <Image
              src="/sort.png"
              alt=""
              width={14}
              height={14}
              className="rounded-full object-cover"
            />
          </button>
          {role === "admin" && (
            <FormModel table="student" type="create" studentId="200" />
          )}
        </div>
      </section>
    </div>
  );
}

export default SearchAndHeader;
