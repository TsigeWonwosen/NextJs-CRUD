"use client";
import Image from "next/image";
import React from "react";
import FormModel from "./FormModel";
import { role } from "@/app/utils/data";

function SearchAndHeader({
  title,
  handleSearch,
}: {
  title: string;
  handleSearch: (search: string) => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSearchChange = () => {
    if (inputRef.current) {
      handleSearch(inputRef?.current?.value);
    }
  };

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
    handleSearch("");
  };
  return (
    <div className="flex flex-col justify-start items-start mb-3 md:flex-row md:justify-between md:items-start">
      <h4 className="text-left text-base text-slate-500  mb-2 w-auto md:flex-1 md:mb-0">
        {title}
      </h4>
      <section className="flex justify-between items-center gap-2 w-full h-full md:w-auto md:gap-0">
        <div className="flex justify-between  items-center bg-slate-800 text-slate-200 rounded-full  py-[1px] gap-2 max-w-[250px] sm:w-full">
          <Image
            src="/search-icon.jpg"
            alt="Search Icone"
            width={12}
            height={12}
            className="bg-slate-900 rounded-l-full  w-[30px] h-[30px] object-cover opacity-20"
          />
          <section className="flex items-center justify-between flex-1 h-full bg-slate-900 rounded-r-full mr-[2px]  px-2 relative">
            <input
              className="outline-none  bg-transparent text-md px-3 py-1 w-full h-full text-slate-200 rounded-md"
              type="text"
              placeholder=" Search ..."
              ref={inputRef}
              onChange={handleSearchChange}
            />
            {inputRef?.current?.value !== "" && (
              <button
                className="w-6 h-full flex items-center justify-center  text-gray-200/10 absolute top-[-50%] right-2 transform translate-y-[50%]"
                onClick={handleClear}
              >
                x
              </button>
            )}
          </section>
        </div>

        <div className="flex justify-center items-center ml-2 gap-1 w-[150px] ">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-200">
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
          {role === "admin" && <FormModel table="Teachers" type="create" />}
        </div>
      </section>
    </div>
  );
}

export default SearchAndHeader;
