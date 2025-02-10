"use client";
import React, { useState } from "react";
import TeacherForm from "./TeacherForm";
import { TeacherSchemaType } from "@/app/libs/types";
import { deleteStudent } from "../actions/actions";
import { useRouter } from "next/navigation";
import Error from "next/error";
import { CirclePlus, Pencil, Trash } from "lucide-react";
import {
  Announcement,
  Event,
  Parent,
  Student,
  Subject,
  Teacher,
} from "@prisma/client";

function FormModel({
  table,
  type,
  studentId,
  data,
}: {
  table: "Students" | "Teachers" | "Parents";
  type: "delete" | "update" | "create";
  studentId?: string;
  data?: Student | Teacher | Parent | Subject | Announcement | Event;
}) {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const handleToggle = () => {
    setShow((prvState) => !prvState);
  };

  const handleSubmit = async (id: string) => {
    try {
      setShow(false);
      await deleteStudent(id);
      router.refresh();
      router.push("/dashboard/students");
    } catch (error: Error | any) {
      console.error(error?.message || "Failed to delete student");
    }
  };

  const styleType = type === "create" ? "w-8 h-8" : "w-7 h-7";

  const Form = ({ id }: { id: string }) => {
    return type === "delete" ? (
      <form
        onSubmit={() => handleSubmit(id)}
        className="w-[350px] h-[250px] bg-black/90 text-white/80 opacity-1 rounded-md flex justify-center flex-col items-center gap-4 z-52 relative"
      >
        <div>
          <label htmlFor="">
            <h4>Are you sure, you went to delete?</h4>
          </label>
        </div>

        <button className="w-max px-2 py-1 rounded-md  text-gray-400 btnGradient">
          Delete
        </button>
        <button
          onClick={handleToggle}
          className="absolute top-3 right-5 w-4 h-4 text-xl font-semibold text-gray-500/50"
        >
          x
        </button>
      </form>
    ) : (
      <TeacherForm
        handleToggle={handleToggle}
        title={type}
        table={table}
        data={data}
      />
    );
  };

  const BgColor =
    type === "create"
      ? "bg-[#4493F8]"
      : type === "update"
      ? "bg-green-900/80"
      : "bg-red-600/65";

  const Icon =
    type === "create" ? (
      <CirclePlus size={"16px"} className="text-white" />
    ) : type === "update" ? (
      <Pencil size={"14px"} className="text-white" />
    ) : (
      <Trash size={"14px"} className="text-white" />
    );

  return (
    <div className="w-auto h-auto">
      <>
        {show && (
          <div className="w-screen h-screen bg-black bg-opacity-60 absolute top-0 left-0  flex justify-center items-center overflow-hidden z-50">
            <Form id={studentId} />
          </div>
        )}
      </>
      <div className="flex justify-center flex-row items-center gap-2">
        <button
          onClick={handleToggle}
          className={` ${styleType} flex justify-center   items-center  ${BgColor} rounded-full `}
        >
          {Icon}
        </button>
      </div>
    </div>
  );
}

export default FormModel;
