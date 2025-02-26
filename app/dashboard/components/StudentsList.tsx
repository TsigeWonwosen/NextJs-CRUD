import Image from "next/image";
import React from "react";
import { Class, Student } from "@prisma/client";
import FormContainer from "./FormContainer";

type StudentType = Student & { class: Class };

function StudentsList(user: StudentType) {
  return (
    <tr
      key={user.id}
      className="h-full w-full rounded-sm border border-transparent even:bg-slate-900 hover:bg-gray-700"
    >
      <td className="flex flex-row justify-start px-1 py-2">
        <Image
          src={user?.img || `/avatar.png`}
          width={35}
          height={35}
          alt="Profile Photo"
          className="h-8 w-8 rounded-full object-cover object-center"
        />
        <section className="ml-[6px] flex flex-col items-start justify-start sm:ml-2 md:ml-3">
          <p className="text-sm">{user.name}</p>
          <span className="text-xs text-slate-700">{user.email}</span>
        </section>
      </td>
      <td className="hidden px-4 py-2 text-sm md:table-cell">{user.id}</td>
      <td className="hidden px-4 py-2 text-sm sm:table-cell">
        {user.class.name}
      </td>
      <td className="hidden px-4 py-2 text-sm md:table-cell">{user.gradeId}</td>
      <td className="hidden px-4 py-2 text-sm md:table-cell">{user.address}</td>
      <td className="hidden px-4 py-2 text-sm md:table-cell">{user.phone}</td>
      <td className="px-4 py-2 text-sm">
        <div className="flex items-center justify-center gap-1">
          <FormContainer table="student" type="update" id={user.id} />

          <FormContainer table="student" type="delete" id={user.id} />
        </div>
      </td>
    </tr>
  );
}

export default StudentsList;
