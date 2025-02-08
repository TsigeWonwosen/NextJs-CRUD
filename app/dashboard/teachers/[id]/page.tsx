import Link from "next/link";
import React from "react";
import BigCalander from "../../components/BigCalander";
import { prisma } from "@/app/libs/prisma";
import { Class, Lesson, Subject, Teacher } from "@prisma/client";
import Annauncement from "../../components/Annauncement";

import StatusChart from "../../components/StatusChart";
import SingleUserInfo from "@/app/components/SingleUserInfo";

type teacherType = Teacher & {
  classes: Class[];
} & { subjects: Subject[] } & { lessons: Lesson[] };

async function SingleTeacher({ params }: { params: { id: string } }) {
  const { id } = await params;

  const teacher: teacherType | null = await prisma.teacher.findUnique({
    where: { id },
    include: { classes: true, subjects: true, lessons: true },
  });

  if (!teacher) {
    return "No Teacher with this Id ";
  }

  return (
    <div className="flex justify-between flex-col md:flex-row w-full h-full gap-4">
      <div className=" w-full md:w-3/4 flex flex-col justify-center items-center gap-4">
        <SingleUserInfo teacher={teacher} />
        <BigCalander />
      </div>
      {/* Lift */}
      <section className="flex flex-col border border-slate-700 rounded-md w-full h-full md:w-1/3 p-4 gap-4">
        <div className="bg-slate-800/90 p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link
              className="p-3 rounded-md  bg-gray-700"
              href={`/classes?supervisorId=${teacher.id}`}
            >
              Teacher&apos;s Classes
            </Link>
            <Link
              className="p-3 rounded-md bg-gray-700"
              href={`/students?teacherId=${teacher.id}`}
            >
              Teacher&apos;s Students
            </Link>
            <Link
              className="p-3 rounded-md  bg-gray-700"
              href={`/lessons?teacherId=${teacher.id}`}
            >
              Teacher&apos;s Lessons
            </Link>
            <Link
              className="p-3 rounded-md  bg-gray-700"
              href={`/exams?teacherId=${teacher.id}`}
            >
              Teacher&apos;s Exams
            </Link>
            <Link
              className="p-3 rounded-md  bg-gray-700"
              href={`/assignments?teacherId=${teacher.id}`}
            >
              Teacher&apos;s Assignments
            </Link>
          </div>
        </div>
        <StatusChart />
        <Annauncement />
      </section>
    </div>
  );
}

export default SingleTeacher;
