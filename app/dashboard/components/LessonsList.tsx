import Image from "next/image";
import Link from "next/link";
import React from "react";
import FormModel from "./FormModel";
import { Class, Lesson, Teacher } from "@prisma/client";

type LessonType = Lesson & { teacher: Teacher } & { class: Class };

function LessonsList(lesson: LessonType) {
  return (
    <tr
      key={lesson.id}
      className="w-full h-full border border-transparent rounded-sm even:bg-slate-900 hover:bg-gray-700"
    >
      <td className=" flex flex-row justify-start  px-1 py-2 ">
        <section className="flex justify-start flex-col items-start ml-[6px] sm:ml-2 md:ml-3 ">
          <p className="text-sm">{lesson.name}</p>
        </section>
      </td>
      <td className=" px-4 py-2 text-sm hidden sm:table-cell">
        {lesson.class.name}
      </td>

      <td className="  px-4 py-2 text-sm hidden md:table-cell">
        {lesson.teacher.name}
      </td>

      <td className="  px-4 py-2 text-sm">
        <div className="flex justify-center items-center gap-1">
          <Link href={`/dashboard/teachers/${lesson.id}`}>
            <FormModel table="Teachers" type="update" studentId={user.id} />
          </Link>
          <FormModel table="Teachers" type="delete" studentId={lesson.id} />
        </div>
      </td>
    </tr>
  );
}

export default LessonsList;
