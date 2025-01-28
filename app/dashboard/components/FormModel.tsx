"use client";
import Image from "next/image";
import React, { useState } from "react";
import TeacherForm from "./TeacherForm";
import { TeacherSchemaType } from "@/app/libs/types";

function FormModel({
  table,
  type,
  id,
}: {
  table: "Students" | "Teachers" | "Parents";
  type: "delete" | "update" | "create";
  id?: number;
}) {
  const [show, setShow] = useState(false);

  const handleToggle = () => {
    setShow((prvState) => !prvState);
  };

  const data: TeacherSchemaType = {
    name: "John Doe",
    email: "john@gmail.com",
    phone: "1234567890",
    address: "New York",
    subjects: "English",
  };

  const Form = () => {
    return type === "delete" ? (
      <form
        action=""
        className="w-[350px] h-[250px] bg-black/90 text-white/80 opacity-1 rounded-md flex justify-center flex-col items-center gap-4 z-52"
      >
        <div>
          <label htmlFor="">
            <h4>Are you sure, you went to delete?</h4>
          </label>
        </div>
        <button
          className="w-max px-2 py-1 rounded-md bg-red-700 text-gray-400"
          onClick={handleToggle}
        >
          Delete
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
      ? "bg-[#007182]"
      : type === "update"
      ? "bg-[#7dd37b]"
      : "bg-[#bf1650]";

  return (
    <div className="w-auto h-auto">
      <>
        {show && (
          <div className="w-screen h-screen bg-black bg-opacity-60 absolute top-0 left-0  flex justify-center items-center overflow-hidden z-50">
            <Form />
          </div>
        )}
      </>
      <div className="flex justify-center flex-row items-center gap-2">
        <button
          className={` flex justify-center   items-center w-8 h-8 ${BgColor} rounded-full `}
          onClick={handleToggle}
        >
          <Image
            src={`/${type}.png`}
            alt=""
            width={16}
            height={16}
            className="rounded-full  object-cover"
          />
        </button>
      </div>
    </div>
  );
}

export default FormModel;
