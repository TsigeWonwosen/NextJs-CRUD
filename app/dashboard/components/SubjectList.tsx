import Link from "next/link";
import React from "react";
import FormModel from "./FormModel";
import { SubjectProps } from "@/app/libs/types";
import FormContainer from "./FormContainer";

function SubjectsList(subject: SubjectProps) {
  return (
    <tr
      key={subject.id}
      className="h-full w-full rounded-sm border border-transparent even:bg-slate-900 hover:bg-gray-700"
    >
      <td className="flex flex-row justify-start px-1 py-2">
        <section className="ml-[6px] flex flex-col items-start justify-start sm:ml-2 md:ml-3">
          <p className="text-sm">{subject.name}</p>
        </section>
      </td>
      <td className="hidden px-4 py-2 text-sm sm:table-cell">
        {subject.lessons.map((teacher) => teacher.name).join(",")}
      </td>

      <td className="hidden px-4 py-2 text-sm md:table-cell">
        {subject.lessons.map((teacher) => teacher.day).join(",")}
      </td>
      <td className="hidden px-4 py-2 text-sm md:table-cell">
        {subject.teachers.map((teacher) => teacher.name).join(",")}
      </td>
      <td className="px-4 py-2 text-sm">
        <div className="flex items-center justify-center gap-1">
          <Link href={`/dashboard/subjects/${subject.id}`}></Link>
          <FormContainer
            table="subject"
            type="update"
            id={subject.id}
            data={subject}
          />
          <FormContainer table="subject" type="delete" id={subject.id} />
        </div>
      </td>
    </tr>
  );
}

export default SubjectsList;
