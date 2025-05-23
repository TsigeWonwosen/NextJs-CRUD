"use client";
import Image from "next/image";
import { Student } from "@prisma/client";
import { useState } from "react";
import FormModelClient from "./clientSideComponets/FormModelClient";

export type StudentListProps = Student & {
  attendances: number[];
  results: number[];
};

function StudentsList({
  user,
  relatedData,
  hundleUpdateStudent,
}: {
  user: StudentListProps;
  relatedData: any;
  hundleUpdateStudent: () => void;
}) {
  const [students, setStudents] = useState(user);

  const { id, name, email, parentId, gradeId, address, phone, img } = students;
  return (
    <tr
      key={id}
      className="h-full w-full rounded-sm border-b-[0.1px] border-gray-200 text-[12px] text-gray-600 dark:border-gray-900 dark:text-gray-400"
    >
      <td className="flex flex-row justify-start px-1 py-2">
        <Image
          src={typeof img === "string" ? img : `/avatar.png`}
          width={30}
          height={30}
          alt="Profile Photo"
          className="h-7 w-7 rounded-md object-cover object-center"
        />
        <section className="ml-[6px] flex flex-col items-start justify-start sm:ml-2 md:ml-3">
          <p className="text-sm">{name}</p>
          <span className="text-xs text-slate-400 dark:text-gray-700">
            {email}
          </span>
        </section>
      </td>
      <td className="hidden px-4 py-2 text-sm md:table-cell">{id}</td>
      <td className="hidden px-4 py-2 text-sm sm:table-cell">{parentId}</td>
      <td className="hidden px-4 py-2 text-sm md:table-cell">{gradeId}</td>
      <td className="hidden px-4 py-2 text-sm md:table-cell">{address}</td>
      <td className="hidden px-4 py-2 text-sm md:table-cell">{phone}</td>
      <td className="px-4 py-2 text-sm">
        <div className="flex items-center justify-center gap-1">
          <FormModelClient
            table="student"
            type="update"
            id={id}
            data={user}
            relatedData={relatedData}
            hundleUpdateStudent={hundleUpdateStudent}
          />
          <FormModelClient
            table="student"
            type="delete"
            id={id}
            relatedData={relatedData}
            hundleUpdateStudent={hundleUpdateStudent}
          />
        </div>
      </td>
    </tr>
  );
}

export default StudentsList;
