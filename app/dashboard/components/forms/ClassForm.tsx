import { createClass } from "@/app/actions/announcementAction";
import { ClassSchema, ClassSchemaType } from "@/app/libs/types";
import { capitalizeTitle } from "@/app/utils/capitalize";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";

function ClassForm({
  handleToggle,
  title,
  table,
  data,
  id,
}: {
  handleToggle: () => void;
  title: string;
  table: string;
  data?: any;
  id?: string;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ClassSchemaType>({ resolver: zodResolver(ClassSchema) });

  const onSubmit = async (data: any) => {
    await createClass(data);
  };

  return (
    <div className="w-[450px] h-max bg-slate-950 p-10 rounded-lg shadow-md flex flex-col items-center  relative z-10 ">
      <div
        className="absolute top-4 right-4 cursor-pointer z-70 w-3 h-3"
        onClick={() => handleToggle()}
      >
        <Image src="/close.png" alt="" width={14} height={14} />
      </div>
      <h2 className="text-2xl font-bold mb-4 text-center ">
        {capitalizeTitle(table) + " " + capitalizeTitle(title)}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-5 w-full bg-slate-950 h-auto z-50"
      >
        <div className="mb-4">
          <label
            htmlFor="username"
            className=" text-left block text-sm font-medium text-gray-700"
          >
            Class Name
          </label>
          <input
            type="text"
            id="username"
            defaultValue={data?.name}
            {...register("name")}
            className="p-2 mt-1 block w-full rounded-md text-gray-700 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter your username"
            required
          />
        </div>
        {errors?.name && <p className="text-red-400">{errors.name?.message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isSubmitting
            ? "Submitting..."
            : title === "create"
            ? "Create"
            : "Update"}
        </button>
      </form>
    </div>
  );
}

export default ClassForm;
