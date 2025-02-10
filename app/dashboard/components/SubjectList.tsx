import Image from "next/image";
import Link from "next/link";
import React from "react";
import FormModel from "./FormModel";
import { Lesson, Subject, Teacher } from "@prisma/client";

type SubjectType = Subject & { teachers: Teacher[] } & { lessons: Lesson[] };

function SubjectsList(subject: SubjectType) {
  return (
    <tr
      key={subject.id}
      className="w-full h-full border border-transparent rounded-sm even:bg-slate-900 hover:bg-gray-700"
    >
      <td className=" flex flex-row justify-start  px-1 py-2 ">
        <section className="flex justify-start flex-col items-start ml-[6px] sm:ml-2 md:ml-3 ">
          <p className="text-sm">{subject.name}</p>
        </section>
      </td>
      <td className=" px-4 py-2 text-sm hidden sm:table-cell">
        {subject.lessons.map((sub) => sub.name).join(", ")}
      </td>

      <td className="  px-4 py-2 text-sm hidden md:table-cell">
        {subject.lessons.map((sub) => sub.day).join(", ")}
      </td>
      <td className="  px-4 py-2 text-sm hidden md:table-cell">
        {subject.teachers.map((teacher) => teacher.name).join(",")}
      </td>
      <td className="  px-4 py-2 text-sm">
        <div className="flex justify-center items-center gap-1">
          <Link href={`/dashboard/teachers/${subject.id}`}>
            <FormModel
              table="Teachers"
              type="update"
              studentId={subject.id + ""}
              data={subject}
            />
          </Link>
          <FormModel
            table="Teachers"
            type="delete"
            studentId={subject.id + ""}
          />
        </div>
      </td>
    </tr>
  );
}

export default SubjectsList;
