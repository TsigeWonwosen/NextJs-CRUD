import Link from "next/link";
import React from "react";
import { prisma } from "@/app/libs/prisma";
import { Class, Lesson, Subject, Teacher } from "@prisma/client";
import Annauncement from "../../components/Annauncement";

import StatusChart from "../../components/StatusChart";
import SingleUserInfo from "@/app/components/SingleUserInfo";
import BigCalenderWraper from "../../components/BigCalenderWraper";
import StatusChartwrapper from "../../components/StatusChartwrapper";

type teacherType = Teacher & {
  classes: Class[];
} & { subjects: Subject[] } & { lessons: Lesson[] };

async function SingleTeacher({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const { id } = await params;

  const { date } = await searchParams;

  const teacher: teacherType | null = await prisma.teacher.findUnique({
    where: { id },
    include: { classes: true, subjects: true, lessons: true },
  });

  if (!teacher) {
    return "No Teacher with this Id ";
  }

  return (
    <div className="flex h-full w-full flex-col justify-between gap-4 md:flex-row">
      <div className="flex w-full flex-col items-center justify-center gap-4 md:w-3/4">
        <SingleUserInfo teacher={teacher} />
        <BigCalenderWraper />
      </div>
      {/* Lift */}
      <section className="flex h-full w-full flex-col gap-4 rounded-md border border-slate-700 p-4 md:w-1/3">
        <div className="rounded-md bg-slate-800/90 p-4">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
            <Link
              className="rounded-md bg-gray-700 p-3"
              href={`/classes?supervisorId=${teacher.id}`}
            >
              Teacher&apos;s Classes
            </Link>
            <Link
              className="rounded-md bg-gray-700 p-3"
              href={`/students?teacherId=${teacher.id}`}
            >
              Teacher&apos;s Students
            </Link>
            <Link
              className="rounded-md bg-gray-700 p-3"
              href={`/lessons?teacherId=${teacher.id}`}
            >
              Teacher&apos;s Lessons
            </Link>
            <Link
              className="rounded-md bg-gray-700 p-3"
              href={`/exams?teacherId=${teacher.id}`}
            >
              Teacher&apos;s Exams
            </Link>
            <Link
              className="rounded-md bg-gray-700 p-3"
              href={`/assignments?teacherId=${teacher.id}`}
            >
              Teacher&apos;s Assignments
            </Link>
          </div>
        </div>
        <StatusChartwrapper />
        <Annauncement searchParams={date} />
      </section>
    </div>
  );
}

export default SingleTeacher;
