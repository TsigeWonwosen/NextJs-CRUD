"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Error from "next/error";
import { CirclePlus, Pencil, Trash, X } from "lucide-react";
import {
  createUpdateDelete,
  METHOD_TYPE,
} from "@/app/actions/creatUpdateDelete";
import { toast } from "react-toastify";
import StudentForm from "../forms/StudentForm";

const DeleteForm = ({
  id,
  handleSubmit,
  handleToggle,
}: {
  id: string;
  handleSubmit: (id: string | number) => void;
  handleToggle: () => void;
}) => {
  return (
    <form
      onSubmit={() => handleSubmit(id)}
      className="opacity-1 z-52 relative flex h-[250px] w-[90%] flex-col items-center justify-center gap-4 rounded-md bg-slate-950 py-2 text-white/80 md:w-[60%]"
    >
      <div>
        <label htmlFor="">
          <h4>Are you sure, you went to delete?</h4>
        </label>
      </div>

      <button className="btnGradient w-max rounded-md px-2 py-1 text-gray-400">
        Delete
      </button>
      <button
        onClick={handleToggle}
        className="absolute right-5 top-5 h-4 w-4 text-xl font-semibold text-gray-500/50"
      >
        <X size={17} className="text-gray-300" />
      </button>
    </form>
  );
};

function FormModelClient({
  table,
  type,
  id,
  data,
  relatedData,
  hundleUpdateStudent,
}: {
  table: string;
  type: "delete" | "update" | "create";
  id?: string;
  data?: any;
  relatedData?: any;
  hundleUpdateStudent: () => void;
}) {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const handleToggle = () => {
    setShow((prvState) => !prvState);
  };

  const action =
    type == "create"
      ? METHOD_TYPE.CREATE
      : type == "update"
        ? METHOD_TYPE.UPDATE
        : METHOD_TYPE.DELETE;

  const handleSubmit = async (id: string | number) => {
    try {
      setShow(false);
      await createUpdateDelete({ model: table, action, id, data });

      router.refresh();
      if (hundleUpdateStudent) {
        await hundleUpdateStudent();
      }

      toast.success(`${table} id: ${id} deleted successfully. `);
    } catch (error: Error | any) {
      console.error(error?.message || "Failed to delete student");
    }
  };

  const styleType = type === "create" ? "w-8 h-8" : "w-7 h-7";

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
    <div className="h-full w-full">
      <>
        {show && (
          <div className="overflew-x-hidden absolute bottom-0 left-0 top-2 z-50 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-70">
            {id && type == "delete" ? (
              <DeleteForm
                id={id?.toString()}
                handleSubmit={handleSubmit}
                handleToggle={handleToggle}
              />
            ) : (
              <StudentForm
                table={table}
                id={id}
                data={data}
                title={type}
                handleToggle={handleToggle}
                relatedData={relatedData}
                hundleUpdateStudent={hundleUpdateStudent}
              />
            )}
          </div>
        )}
      </>
      <div className="flex flex-row items-center justify-center gap-2">
        <button
          onClick={handleToggle}
          className={` ${styleType} flex items-center justify-center ${BgColor} rounded-full`}
        >
          {Icon}
        </button>
      </div>
    </div>
  );
}

export default FormModelClient;
