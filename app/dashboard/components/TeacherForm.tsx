"use client";
import React, { startTransition, useActionState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addUser } from "@/app/libs/action";
import { TeacherSchema, TeacherSchemaType } from "@/app/libs/types";
import Image from "next/image";

function TeacherForm({
  handleToggle,
  title,
}: {
  handleToggle: () => void;
  title: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeacherSchemaType>({ resolver: zodResolver(TeacherSchema) });

  const onSubmit: SubmitHandler<TeacherSchemaType> = async (
    data: TeacherSchemaType
  ) => {
    console.log("Selected File:");
    console.log("Data:", data);
    reset();
  };

  return (
    <div className="w-[450px] h-max bg-slate-950 p-10 rounded-lg shadow-md flex flex-col items-center  relative z-10 ">
      <div
        className="absolute top-4 right-4 cursor-pointer z-70 w-3 h-3"
        onClick={handleToggle}
      >
        <Image src="/close.png" alt="" width={14} height={14} />
      </div>
      <h2 className="text-2xl font-bold mb-4 text-center text--">{title}</h2>
      {/* <form action={action} className="p-5 w-4/5"> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-5 w-full bg-slate-950"
      >
        <div className="mb-4">
          <label
            htmlFor="username"
            className=" text-left block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            {...register("name")}
            className="p-2 mt-1 block w-full rounded-md text-gray-700 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter your username"
            required
          />
        </div>
        {errors?.name && <p className="text-red-400">{errors.name?.message}</p>}

        <div className="mb-4">
          <label
            htmlFor="email"
            className=" text-left  block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className=" p-2 mt-1 block w-full rounded-md text-gray-700 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter your email"
            required
          />
        </div>
        {errors.email?.message && (
          <p className="text-red-400">{errors?.email?.message}</p>
        )}
        <div className="mb-4">
          <label
            htmlFor="phone"
            className=" text-left  block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            type="phone"
            id="phone"
            {...register("phone")}
            className=" p-2 mt-1 block w-full rounded-md text-gray-700 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter your phone number"
            required
          />
        </div>
        {errors.phone?.message && (
          <p className="text-red-400">{errors?.phone?.message}</p>
        )}
        <div className="mb-4">
          <label
            htmlFor="address"
            className=" text-left  block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            type="address"
            id="addrees"
            {...register("address")}
            className="p-2 mt-1 block w-full rounded-md text-gray-700 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter your password"
            required
          />
        </div>
        {errors.address?.message && (
          <p className="text-red-400">{errors.address?.message}</p>
        )}

        <div className="mb-4">
          <label
            htmlFor="subjects"
            className=" text-left  block text-sm font-medium text-gray-700"
          >
            Subject
          </label>
          <select
            id="subjects"
            {...register("subjects")}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          >
            <option value="Maths">Maths</option>
            <option value="Biology">Bilology</option>
            <option value="English">English</option>
          </select>
        </div>
        {errors.subjects?.message && (
          <p className="text-red-400">{errors.subjects?.message}</p>
        )}
        {/* <div className="mb-4">
          <label
            htmlFor="photo"
            className=" text-left   text-sm font-medium text-gray-700 flex justify-between items-center"
          >
            <Image
              src={`/upload.png`}
              alt="Upload Photo"
              width={29}
              height={29}
            />
            <span>Upload Photo</span>
          </label>
          <input
            id="photo"
            // name="role"
            {...register("photo")}
            className=" p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            type="file"
          />
        </div>
        {errors.photo?.message && (
          <p className="text-red-400">Photo Error: {errors.photo?.message}</p>
        )} */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add user
        </button>
      </form>
    </div>
  );
}

export default TeacherForm;
