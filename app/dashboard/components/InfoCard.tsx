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
    <div className="even:bg-wondeblackColor/20 flex h-[125px] max-w-[400px] flex-col justify-between gap-2 rounded-xl px-5 py-3 shadow-sm shadow-slate-100/20 odd:bg-light-bgw dark:odd:bg-dark-bg">
      <div className="flex w-full items-center justify-between">
        <h1 className="rounded-sm bg-light-primary/90 px-[4px] py-[1px] text-left text-[10px] text-white/80 dark:bg-dark-primary/90 dark:text-white">
          <p>{new Date().getFullYear()}</p>
        </h1>
        <button>
          <Ellipsis
            className="text-light-text dark:text-dark-text"
            size={"16px"}
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
