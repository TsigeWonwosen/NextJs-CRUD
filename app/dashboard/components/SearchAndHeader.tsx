"use client";
import Image from "next/image";
import React from "react";
import FormModel from "./FormModel";

function SearchAndHeader({ title }: { title: string }) {
  return (
    <div className="flex flex-col justify-start items-start mb-3 md:flex-row md:justify-between md:items-start">
      <h4 className="text-left text-base text-slate-500  mb-2 w-auto md:flex-1 md:mb-0">
        {title}
      </h4>
      <section className="flex justify-between items-center gap-2">
        <div className="flex justify-center  bg-slate-300 text-slate-200 rounded-full px-2 py-[1px] gap-2 max-w-[250px] sm:w-full">
          <Image
            src="/search-icon.jpg"
            alt="Search Icone"
            width={14}
            height={14}
            className="bg-transparent rounded-full m-1"
          />
          <input
            className="width-3/4 outline-none mr-[5px] bg-transparent text-slate-800 text-sm"
            type="text"
            placeholder=" Search ..."
          />
        </div>

        <div className="flex justify-center items-center ml-2 gap-1 w-1/4">
          <FormModel table="Teachers" type="create" />
          <FormModel table="Teachers" type="delete" />
          <FormModel table="Teachers" type="update" />
        </div>
      </section>
    </div>
  );
}

export default SearchAndHeader;
