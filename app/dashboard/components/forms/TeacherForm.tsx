"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TeacherSchema, TeacherSchemaType } from "@/app/libs/types";
import Image from "next/image";
import { capitalizeTitle } from "@/app/utils/capitalize";
import {
  createUpdateDelete,
  METHOD_TYPE,
} from "@/app/actions/creatUpdateDelete";
import { UserSex } from "@prisma/client";

function TeacherForm({
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
  const [preview, setPreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TeacherSchemaType>({ resolver: zodResolver(TeacherSchema) });

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("address", data.address);
    formData.append("email", data.email);
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("subjects", data.subjects);

    const newTeacher = {
      id: id,
      username: data.name,
      name: "wonde",
      surname: "shi",
      email: data.email,
      phone: data.phone,
      address: data.address,
    };

    await createUpdateDelete({
      model: "parent",
      action: METHOD_TYPE.UPDATE,
      data: newTeacher,
      id,
    });
    handleToggle();
    // formData.append("photo", data.photo as File);

    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value); // Logs each key-value pair
    // }
    // reset();
  };

  // const handlePhotoPreview = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = event.target.files?.[0]; // Get the first file
  //   if (selectedFile) {
  //     setValue("photo", selectedFile); // Set the file to the form
  //     setPreview(URL.createObjectURL(selectedFile)); // Generate preview
  //   }
  // };

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
            Username
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
            defaultValue={data?.email}
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
            defaultValue={data?.phone}
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
            defaultValue={data?.address}
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
            Subjects
          </label>
          <select
            id="subjects"
            defaultValue={data?.subjects}
            {...register("subjects")}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          >
            <option value="Maths">Maths</option>
            <option value="Biology">Bilology</option>
            <option value="English">English</option>
            <option value="physics">Physics</option>
            <option value="art">Art</option>
            <option value="chemistry">Chemistry</option>
            <option value="computer science">Computer Science</option>
            <option value="history">History</option>
            <option value="geography">Giography</option>
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
          </label> */}
        {/* <input
            id="photo"
            type="file"
            {...register("photo")}
            // onChange={handlePhotoPreview}
            className=" block p-2 mt-1  w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div> */}
        {/* {errors.photo?.message && (
          <p className="text-red-400">Photo Error: {errors.photo?.message}</p>
        )} */}
        {/* {preview && (
          <Image
            src={preview}
            alt="Preview"
            className="mt-2 w-32 h-32 object-cover rounded"
          />
        )} */}
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

export default TeacherForm;
