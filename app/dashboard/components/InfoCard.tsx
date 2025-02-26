import { prisma } from "@/app/libs/prisma";
import Image from "next/image";
import React from "react";

async function InfoCard({
  name,
}: {
  name: "admin" | "student" | "parent" | "teacher";
}) {
  const compoundCount: Record<typeof name, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    parent: prisma.parent,
    student: prisma.student,
  };

  const Count: any = await compoundCount[name].count();

  return (
    <div className="odd:bg-wondebgHardColo flex h-[120px] w-full min-w-[180px] max-w-[300px] flex-1 flex-col justify-between gap-2 rounded-xl px-5 py-3 shadow-md shadow-slate-100/10 even:bg-wondeblackColor/20">
      <div className="flex w-full items-center justify-between">
        <h1 className="rounded-full bg-slate-700 px-[4px] py-[1px] text-left text-[10px] text-cyan-600">
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
        <span className="from-neutral-100 text-left text-2xl font-bold">
          {Count}
        </span>
      </div>
      <div className="flex justify-start text-left">
        <span className="w-full text-sm font-medium capitalize text-gray-500">
          {name}s
        </span>
      </div>
    </div>
  );
}

export default InfoCard;
