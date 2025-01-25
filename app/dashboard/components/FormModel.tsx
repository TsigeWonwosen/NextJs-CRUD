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
  const [deleteUser, setDeleteUser] = useState(false);

  const Form = () => (
    <form
      action=""
      className="w-[300px] h-[200px] bg-blue-500/10 rounded-md flex justify-center flex-col items-center gap-4"
    >
      <div>
        <label htmlFor="">
          <h4>Are you sure, you went to delete?</h4>
        </label>
      </div>
      <button
        className="w-max px-2 py-1 rounded-md bg-red-700 text-gray-400"
        onClick={() => setDeleteUser(false)}
      >
        Delete
      </button>
    </form>
  );
  const handleToggle = () => {
    setShow(!show);
  };

  return (
    <div className="w-auto h-auto">
      <>
        {show && (
          <div className="w-screen h-screen bg-black opacity-85 absolute top-0 left-0  flex justify-center items-center overflow-hidden">
            <TeacherForm handleToggle={handleToggle} title="Add Teacher" />
          </div>
        )}
        {deleteUser && (
          <div className="w-screen h-screen bg-black opacity-85 absolute top-0 left-0  flex justify-center items-center overflow-hidden">
            <Form />
          </div>
        )}
      </>
      <div className="flex justify-center flex-row items-center gap-2">
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
          onClick={() => setDeleteUser(true)}
        >
          <Image
            src="/delete.png"
            alt=""
            width={16}
            height={16}
            className=" rounded-full bg-red-700/10 object-cover"
          />
        </button>
      </div>
    </div>
  );
}

export default FormModel;
