"use client";
import Image from "next/image";
import React, { useState } from "react";
import TeacherForm from "./TeacherForm";

function FormModel(
  teble: string,
  type: "Delete" | "Edit" | "Update" | "Add",
  id?: number
) {
  const [show, setShow] = useState(false);

  const Form = () => (
    <form action="">
      <label htmlFor="">Are you sure, you went to delete?</label>
      <button className="w-max px-2 py-1 rounded-md bg-red-700 text-gray-400">
        Delete
      </button>
    </form>
  );
  const handleToggle = () => {
    console.log(show);
    setShow(!show);
  };

  return (
    <div>
      <>
        {show && (
          <div className="w-screen h-screen bg-black opacity-85 absolute top-0 left-0  flex justify-center items-center overflow-hidden">
            <TeacherForm handleToggle={handleToggle} />
          </div>
        )}
      </>
      <button
        className=" flex justify-center text-center  items-center w-7 h-7 p-1 bg-lime-950 rounded-full "
        onClick={() => setShow(true)}
      >
        <Image
          src="/view.png"
          alt=""
          width={16}
          height={16}
          className="rounded-full bg-lime-500 object-cover"
        />
      </button>
      <button
        className="flex justify-center items-center w-7 h-7 p-1  bg-red-200 rounded-full"
        onClick={() => setShow(true)}
      >
        <Image
          src="/delete.png"
          alt=""
          width={16}
          height={16}
          className=" rounded-full bg-red-700 object-cover"
        />
      </button>
    </div>
  );
}

export default FormModel;
