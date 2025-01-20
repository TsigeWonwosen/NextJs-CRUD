import Image from "next/image";
import React from "react";

function SearchAndHeader({ title }: { title: string }) {
  return (
    <div className="flex flex-col justify-start items-start mb-3 md:flex-row md:justify-between md:items-start">
      <h4 className="text-left text-base text-slate-500  mb-2 w-auto md:flex-1 md:mb-0">
        {title}
      </h4>
      <section className="flex justify-between items-center ">
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

        <div className="flex justify-center items-center gap-1 w-1/4">
          <button className=" flex justify-center text-center text-yellow-400  items-center h-[16] w-[16] p-2 bg-slate-600 rounded-full">
            +
          </button>
          <button className="flex justify-center text-center text-pink-400 h-[16] w-[16] p-2 items-center bg-orange-900 rounded-full">
            +
          </button>
          <button className="flex justify-center text-center text-blue-400 h-[16] w-[16] p-2 items-center bg-teal-600 rounded-full">
            +
          </button>
        </div>
      </section>
    </div>
  );
}

export default SearchAndHeader;
