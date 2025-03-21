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
      className="h-full w-full rounded-sm border border-transparent even:bg-slate-900 hover:bg-gray-700"
    >
      <td className="flex flex-row justify-start px-1 py-2">
        <section className="ml-[6px] flex flex-col items-start justify-start sm:ml-2 md:ml-3">
          <p className="text-sm">{lesson.name}</p>
        </section>
      </td>
      <td className="hidden px-4 py-2 text-sm sm:table-cell">
        {lesson.class.name}
      </td>

      <td className="hidden px-4 py-2 text-sm md:table-cell">
        {lesson.teacher.name}
      </td>

      <td className="px-4 py-2 text-sm">
        <div className="flex items-center justify-center gap-1">
          <Link href={`/dashboard/teachers/${lesson.id}`}>
            <FormModel
              table="lesson"
              type="update"
              id={lesson.id}
              data={lesson}
            />
          </Link>
          <FormModel table="lesson" type="delete" id={lesson.id} />
        </div>
      </td>
    </tr>
  );
}

export default LessonsList;
