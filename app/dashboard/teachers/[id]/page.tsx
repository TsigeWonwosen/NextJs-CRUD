import Image from "next/image";
import Link from "next/link";
import React from "react";
import BigCalander from "../../components/BigCalander";
import { prisma } from "@/app/libs/prisma";
import { Class, Lesson, Subject, Teacher } from "@prisma/client";
import Annauncement from "../../components/Annauncement";

import SchoolChart from "../../components/SchoolChart";
import StatusChart from "../../components/StatusChart";

type teacherType = Teacher & {
  classes: Class[];
} & { subjects: Subject[] } & { lessons: Lesson[] };

async function SingleTeacher({ params }: { params: { id: string } }) {
  const { id } = params;
  const teacher: teacherType | null = await prisma.teacher.findUnique({
    where: { id },
    include: { classes: true, subjects: true, lessons: true },
  });

  if (!teacher) {
    return "No user with this Id ";
  }

  return (
    <div className="flex justify-between flex-col md:flex-row w-full h-full gap-4">
      <div className=" w-full md:w-3/4 flex flex-col justify-center items-center gap-4">
        <div className="flex justify-between items-start ml-3 gap-7 w-full  bg-gray-900 p-4">
          <div className="flex justify-start flex-row items-left gap-4 rounded-md border border-green-400/20 bg-gray-900 p-4 w-full h-full">
            <Image
              src={teacher?.img ? teacher.img : "/avatar.png"}
              width={100}
              height={100}
              alt={teacher?.name}
              className="object-cover object-center rounded-full  h-[80px] w-[80px]"
            />
            <div className="flex justify-left flex-col items-left  text-left">
              <h4 className="text-slate-300 font-semibold"> {teacher.name}</h4>
              <p className="text-gray-600 text-xs font-thin">{teacher.email}</p>
            </div>
          </div>
          <div className="flex justify-start flex-col items-start text-left h-full w-full gap-4 px-6 py-4">
            <div className="space-y-3">
              <p>Phone :{teacher.phone}</p>
              <p>Teacher Id :{teacher.username}</p>
              <p>Addres : {teacher.address}</p>
              <p>
                Classes :{teacher.classes.map((sub) => sub.name).join(", ")}
              </p>
              <p>
                {" "}
                Subjects : {teacher.subjects.map((sub) => sub.name).join(", ")}
              </p>
            </div>
            <div className="mt-auto">
              <Link href="/dashboard/teachers">
                <button className="btn rounded-md border border-green-400 w-[100px] px-2 py-1 hover:text-green-500 hover:border-white">
                  Go Back
                </button>
              </Link>
            </div>
          </div>
        </div>

        <BigCalander />
      </div>
      <section className="flex flex-col border border-slate-700 rounded-md w-full h-full md:w-1/3 p-4 gap-4">
        <div className="bg-slate-800/90 p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link
              className="p-3 rounded-md  bg-gray-700"
              href={`/list/classes?supervisorId=${teacher.id}`}
            >
              Teacher&apos;s Classes
            </Link>
            <Link
              className="p-3 rounded-md bg-gray-700"
              href={`/list/students?teacherId=${teacher.id}`}
            >
              Teacher&apos;s Students
            </Link>
            <Link
              className="p-3 rounded-md  bg-gray-700"
              href={`/list/lessons?teacherId=${teacher.id}`}
            >
              Teacher&apos;s Lessons
            </Link>
            <Link
              className="p-3 rounded-md  bg-gray-700"
              href={`/list/exams?teacherId=${teacher.id}`}
            >
              Teacher&apos;s Exams
            </Link>
            <Link
              className="p-3 rounded-md  bg-gray-700"
              href={`/list/assignments?teacherId=${teacher.id}`}
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
