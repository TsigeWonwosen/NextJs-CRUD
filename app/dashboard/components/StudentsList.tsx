import Image from "next/image";
import React from "react";
import FormModel from "./FormModel";
import { Class, Student } from "@prisma/client";

type StudentType = Student & { class: Class };

function StudentsList(user: StudentType) {
  return (
    <tr
      key={user.id}
      className="w-full h-full border border-transparent rounded-sm even:bg-slate-900 hover:bg-gray-700"
    >
      <td className=" flex flex-row justify-start  px-1 py-2 ">
        <Image
          src={user?.img || `/avatar.png`}
          width={35}
          height={35}
          alt="Profile Photo"
          className=" object-cover object-center rounded-full w-8 h-8"
        />
        <section className="flex justify-start flex-col items-start ml-[6px] sm:ml-2 md:ml-3 ">
          <p className="text-sm">{user.name}</p>
          <span className="text-xs text-slate-700">{user.email}</span>
        </section>
      </td>
      <td className=" px-4 py-2 text-sm hidden md:table-cell">
        {user.classId}
      </td>
      <td className=" px-4 py-2 text-sm hidden sm:table-cell">
        {user.class.name}
      </td>
      <td className="  px-4 py-2 text-sm hidden md:table-cell">
        {user.gradeId}
      </td>
      <td className="  px-4 py-2 text-sm hidden md:table-cell">
        {user.address}
      </td>
      <td className="  px-4 py-2 text-sm hidden md:table-cell">{user.phone}</td>
      <td className="  px-4 py-2 text-sm">
        <div className="flex justify-center items-center gap-1">
          <FormModel table="Teachers" type="update" studentId={user.id} />

          <FormModel table="Students" type="delete" studentId={user.id} />
        </div>
      </td>
    </tr>
  );
}

export default StudentsList;
