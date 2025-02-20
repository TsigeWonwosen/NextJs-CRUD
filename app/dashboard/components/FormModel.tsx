"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Error from "next/error";
import { CirclePlus, Pencil, Trash, X } from "lucide-react";
import {
  createUpdateDelete,
  METHOD_TYPE,
} from "@/app/actions/creatUpdateDelete";
import RenderForm from "./forms/RenderForm";
import { toast } from "react-toastify";

const DeleteForm = ({
  id,
  handleSubmit,
  handleToggle,
}: {
  id: string | number;
  handleSubmit: (id: string | number) => void;
  handleToggle: () => void;
}) => {
  return (
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
        className="absolute top-5 right-5 w-4 h-4 text-xl font-semibold text-gray-500/50"
      >
        <X size={17} className="text-gray-300" />
      </button>
    </form>
  );
};

function FormModel({
  table,
  type,
  id,
  data,
  relatedData,
}: {
  // table: "student" | "teacher" | "parent" | "class" | "subject";
  table: string;
  type: "delete" | "update" | "create";
  id?: string | number;
  data?: any;
  relatedData?: any;
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
      if (table == "class") {
        router.push(`/dashboard/${table}es`);
      } else {
        router.refresh();
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
    <div className="w-auto h-auto">
      <>
        {show && (
          <div className="w-screen h-screen bg-black bg-opacity-60 absolute top-0 left-0  flex justify-center items-center overflow-hidden z-50">
            {id && type == "delete" ? (
              <DeleteForm
                id={id}
                handleSubmit={handleSubmit}
                handleToggle={handleToggle}
              />
            ) : (
              <RenderForm
                table={table}
                id={id}
                title={type}
                handleToggle={handleToggle}
                data={data}
                relatedData={relatedData}
              />
            )}
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
