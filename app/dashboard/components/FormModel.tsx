"use client";
import Image from "next/image";
import React, { useState } from "react";
import TeacherForm from "./TeacherForm";

function FormModel({
  table,
  type,
  id,
}: {
  table: "Students" | "Teachers" | "Parents";
  type: "delete" | "edit" | "update" | "add";
  id?: number;
}) {
  const [show, setShow] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);

  const Form = () => (
    <form
      action=""
      className="w-[300px] h-[200px] bg-blue-500/10 rounded-md flex justify-center flex-col items-center gap-4 z-10"
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

  const handleAdd = () => {
    setShow((prvState) => !prvState);
  };

  const handleDelete = () => {
    setDeleteUser((prvStat) => !prvStat);
  };

  const handleEdit = () => {
    setShow((prvState) => !prvState);
  };
  const BgColor =
    type === "add"
      ? "bg-[#FFF]"
      : type === "update"
      ? "bg-[#ff7aa8]"
      : "bg-[#bf1650]";

  return (
    <div className="w-auto h-auto">
      <>
        {show && (
          <div className="w-screen h-screen bg-black opacity-85 absolute top-0 left-0  flex justify-center items-center overflow-hidden">
            <TeacherForm handleToggle={handleAdd} title={type} table={table} />
          </div>
        )}
        {deleteUser && (
          <div
            className={`w-screen h-screen bg-black opacity-85 absolute top-0 left-0  flex justify-center items-center overflow-hidden `}
          >
            <Form />
          </div>
        )}
      </>
      <div className="flex justify-center flex-row items-center gap-2">
        <button
          className={` flex justify-center   items-center w-8 h-8 ${BgColor} rounded-full `}
          onClick={
            type === "add"
              ? handleAdd
              : type === "delete"
              ? handleDelete
              : handleEdit
          }
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
