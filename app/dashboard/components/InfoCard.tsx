import { prisma } from "@/app/libs/prisma";
import { Ellipsis } from "lucide-react";
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
    <div className="odd:bg-light-bgw dark:odd:bg-dark-bg flex h-[125px] max-w-[400px] flex-col justify-between gap-2 rounded-xl px-5 py-3 shadow-sm shadow-slate-100/20 even:bg-wondeblackColor/20">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-light-accent dark:text-light-accent bg-light-primary dark:bg-dark-primary rounded-md px-[4px] py-[1px] text-left text-[10px]">
          <p>{new Date().getFullYear()}</p>
        </h1>
        <button>
          <Ellipsis className="text-light-text dark:text-dark-text" />
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
