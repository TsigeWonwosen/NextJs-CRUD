"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StudntSchema, StudentSchemaType } from "@/app/libs/types";
import Image from "next/image";
import { capitalizeTitle } from "@/app/utils/capitalize";
import {
  createUpdateDelete,
  METHOD_TYPE,
} from "@/app/actions/creatUpdateDelete";
import { UserSex } from "@prisma/client";

function ParentForm({
  handleToggle,
  title,
  table,
  data,
  id,
  relatedData,
}: {
  handleToggle: () => void;
  title: string;
  table: string;
  data?: any;
  id?: string;
  relatedData: any;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StudentSchemaType>({ resolver: zodResolver(StudntSchema) });

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
    <div className="relative z-10 flex h-max w-[450px] flex-col items-center rounded-lg bg-slate-950 p-10 shadow-md">
      <div
        className="z-70 absolute right-4 top-4 h-3 w-3 cursor-pointer"
        onClick={() => handleToggle()}
      >
        <Image src="/close.png" alt="" width={14} height={14} />
      </div>
      <h2 className="mb-4 text-center text-2xl font-bold">
        {capitalizeTitle(table) + " " + capitalizeTitle(title)}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="z-50 h-auto w-full bg-slate-950 p-5"
      >
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-left text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            defaultValue={data?.name}
            {...register("name")}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter your username"
            required
          />
        </div>
        {errors?.name && <p className="text-red-400">{errors.name?.message}</p>}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-left text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            defaultValue={data?.email}
            {...register("email")}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
            className="block text-left text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            type="phone"
            id="phone"
            defaultValue={data?.phone}
            {...register("phone")}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
            className="block text-left text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            type="address"
            id="addrees"
            defaultValue={data?.address}
            {...register("address")}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter your password"
            required
          />
        </div>
        {errors.address?.message && (
          <p className="text-red-400">{errors.address?.message}</p>
        )}
        <div className="mb-4">
          <label
            htmlFor="birthday"
            className="block text-left text-sm font-medium text-gray-700"
          >
            Birth Day
          </label>
          <input
            type="date"
            id="birthday"
            defaultValue={data?.birthday}
            {...register("birthday")}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
            className="block text-left text-sm font-medium text-gray-700"
          >
            Subjects
          </label>
          <select
            id="subjects"
            defaultValue={data?.subjects}
            {...register("subjects")}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
          className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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

export default ParentForm;
