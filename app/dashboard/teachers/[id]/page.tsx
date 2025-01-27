import { teachersData } from "@/app/utils/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import BigCalander from "../../components/BigCalander";

type propsType = {
  id: string;
};

type Teacher = {
  id: number;
  teacherId: string;
  name: string;
  email: string;
  photo: string;
  phone: string;
  subjects: string[];
  classes: string[];
  address: string;
};
async function SingleTeacher({ params }: { params: propsType }) {
  let { id } = await params;
  let newId = parseInt(id);
  const teacher: Teacher | undefined = teachersData.find(
    (user) => user.id === newId
  );
  if (!teacher) {
    return "No user with this Id ";
  }
  return (
    <div className=" flex flex-col justify-center items-center gap-4">
      <div className="flex justify-between items-center ml-3 gap-7 w-full">
        <div className="flex justify-start flex-col items-left gap-4 rounded-md border border-green-400 bg-gray-900 p-4">
          <Image
            src={teacher?.photo}
            width={400}
            height={500}
            alt={teacher?.name}
            className="object-cover object-center rounded-t-md  flex-grow-1 h-[120px] w-[100px]"
          />
          <div className="flex justify-left flex-col items-left  text-left">
            <h4 className="text-slate-300 font-semibold"> {teacher.name}</h4>
            <p className="text-gray-600 text-sm font-thin">{teacher.email}</p>
          </div>
        </div>
        <div className="flex justify-start flex-col items-start text-left bg-gray-900 h-full w-full gap-4 px-6 py-4">
          <div className="space-y-3">
            <p>Phone :{teacher.phone}</p>
            <p>Teacher Id :{teacher.teacherId}</p>
            <p>Addres : {teacher.address}</p>
            <p>Classes :{teacher.classes.join(", ")}</p>
            <p> Subjects : {teacher.subjects.join(", ")}</p>
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
  );
}

export default SingleTeacher;
