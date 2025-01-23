"use client";
import React from "react";

function Pagination() {
  return (
    <div className="flex justify-between items-center px-4 py-2 mt-1 w-[98%] border border-slate-700 rounded-md">
      <button className=" rounded-md px-2 py-1  bg-slate-600 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
        Priv
      </button>
      <div className="flex justify-center items-center  text-center w-[50%]  gap-3 m-1">
        <button className=" flex justify-center items-center rounded-md px-[7px] py-[2px]  bg-slate-500 font-semibold w-[20px] h-[20px]">
          1
        </button>
        <button className=" flex justify-center items-center rounded-md px-[7px] py-[1px]  bg-slate-600 font-semibold w-[20px] h-[20px]">
          2
        </button>
        <div>. . .</div>
        <button className=" flex justify-center items-center rounded-md px-[7px] py-[1px]  bg-slate-600 font-semibold w-[20px] h-[20px]">
          10
        </button>
      </div>
      <button className=" rounded-md px-2 py-1  bg-slate-600 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
        Next
      </button>
    </div>
  );
}

export default Pagination;
