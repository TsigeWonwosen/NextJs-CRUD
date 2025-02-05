import Image from "next/image";
import Link from "next/link";
import React from "react";
import FormModel from "./FormModel";
import { Class, Subject, Teacher } from "@prisma/client";

type TeachersListProps = Teacher & { classes: Class[] } & {
  subjects: Subject[];
};

function TeachersList(user: TeachersListProps) {
  return (
    <tr
      key={user.id}
      className="w-full h-full border border-transparent rounded-sm even:bg-slate-900 hover:bg-gray-700"
    >
      <td className=" flex flex-row justify-around  px-1 py-2 ">
        <Image
          src={user.img || "/profile.png"}
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
      <td className=" px-4 py-2 text-sm hidden md:table-cell">{user.id}</td>
      <td className=" px-4 py-2 text-sm hidden sm:table-cell">
        {user.subjects.map((sub) => sub.name).join(", ")}
      </td>
      <td className="  px-4 py-2 text-sm hidden md:table-cell">
        {user.classes.map((cla) => cla.name).join(", ")}
      </td>
      <td className="  px-4 py-2 text-sm hidden md:table-cell">
        {user.address}
      </td>
      <td className="  px-4 py-2 text-sm hidden md:table-cell">{user.phone}</td>
      <td className="  px-4 py-2 text-sm">
        <div className="flex justify-center items-center gap-1">
          <Link href={`/dashboard/teachers/${user.id}`}>
            <button className=" flex justify-center text-center  items-center w-7 h-7 p-1 bg-lime-950 rounded-full ">
              <Image
                src="/view.png"
                alt=""
                width={16}
                height={16}
                className="rounded-full bg-lime-500 object-cover"
              />
            </button>
          </Link>
          <FormModel table="Teachers" type="delete" studentId={user.id} />
        </div>
      </td>
    </tr>
  );
}

export default TeachersList;
