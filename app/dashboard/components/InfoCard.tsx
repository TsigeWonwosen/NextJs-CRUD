import Image from "next/image";
import React from "react";

function InfoCard({ name, total }: { name: string; total: number }) {
  return (
    <div className="min-w-[180px]  h-[120px] flex justify-between flex-col odd:bg-slate-800 even:bg-gray-600 rounded-xl gap-2 px-5 py-3 flex-1">
      <div className="flex justify-between items-center w-full">
        <h1 className=" text-[10px] text-left  bg-slate-700 text-slate-300 px-[4px] py-[1px] rounded-full">
          <p>{new Date().getFullYear()}</p>
        </h1>
        <button>
          <Image
            src={`/more.png`}
            alt="More"
            width={20}
            height={20}
            className="rounded-md"
          />
        </button>
      </div>
      <div className="flex justify-start">
        <span className="text-left text-2xl font-bold from-neutral-100">
          {total}
        </span>
      </div>
      <div className="flex justify-start text-left">
        <span className="capitalized font-medium text-sm w-full text-gray-500">
          {name}
        </span>
      </div>
    </div>
  );
}

export default InfoCard;
