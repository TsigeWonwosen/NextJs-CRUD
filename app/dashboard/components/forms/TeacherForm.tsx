"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TeacherSchema, TeacherSchemaType } from "@/app/libs/types";
import Image from "next/image";
import { capitalizeTitle } from "@/app/utils/capitalize";
import { toast } from "react-toastify";
import { createTeacher, updateTeacher } from "@/app/actions/teacherAction";
import { useRouter } from "next/navigation";

function TeacherForm({
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
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TeacherSchemaType>({ resolver: zodResolver(TeacherSchema) });

  const router = useRouter();

  useEffect(() => {
    if (data && (data.subjects || data.lessons || data.classes)) {
      setValue(
        "subjects",
        data?.subjects?.map((lesson: { id: string }) => lesson.id.toString())
      );
      setValue(
        "lessons",
        data?.lessons?.map((lesson: { id: string }) => lesson.id.toString())
      );

      setValue(
        "classes",
        data?.classes?.map((classItem: { id: string }) =>
          classItem.id.toString()
        )
      );
    }
  }, [id, setPreview]);

  const onSubmit = async (data: TeacherSchemaType) => {
    if (!data || typeof data !== "object") {
      throw new Error(
        "Invalid payload: Expected an object, received " + typeof data
      );
    }

    try {
      if (title == "update") {
        if (data.id) {
          const res = await updateTeacher(data?.id, data);

          if (res.success) {
            toast.success(res.message, { autoClose: 3000 });
          } else {
            if (res.errors) {
              res.errors.forEach((err) => {
                setError("root", { message: err.message });
                toast.error(err.message);
              });
            }
          }
        }
      } else {
        const res = await createTeacher(data);
        if (res.success) {
          toast.success(res.message, { autoClose: 3000 });
        }
      }
      reset();
      handleToggle();
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  // const handlePhotoPreview = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = event.target.files?.[0]; // Get the first file
  //   if (selectedFile) {
  //     setValue("photo", selectedFile); // Set the file to the form
  //     setPreview(URL.createObjectURL(selectedFile)); // Generate preview
  //   }
  // };

  const { subjects = [], lessons = [], classes = [] } = relatedData;
  return (
    <div className="w-[70%] h-max bg-slate-950 p-10 rounded-lg shadow-md flex flex-col items-center  relative z-10 ">
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
        className=" p-5 w-full bg-slate-950 h-auto z-50"
      >
        <div className="flex justify-between items-start gap-x-3">
          <section className="w-full h-full">
            <div className="mb-4">
              <label
                htmlFor="id"
                className=" text-left block text-sm font-medium text-gray-700"
              >
                Id
              </label>
              <input
                type="text"
                id="id"
                defaultValue={data?.id}
                {...register("id")}
                className="p-2 mt-1 block w-full rounded-md text-gray-700 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter your address"
              />
            </div>
            {errors?.id && <p className="text-red-400">{errors.id?.message}</p>}
            <div className="mb-4">
              <label
                htmlFor="name"
                className=" text-left block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                defaultValue={data?.name}
                {...register("name")}
                className="p-2 mt-1 block w-full rounded-md text-gray-700 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter your name"
                required
              />
            </div>
            {errors?.name && (
              <p className="text-red-400">{errors.name?.message}</p>
            )}

            <div className="mb-4">
              <label
                htmlFor="surname"
                className=" text-left block text-sm font-medium text-gray-700"
              >
                SurName
              </label>
              <input
                type="text"
                id="surname"
                defaultValue={data?.surname}
                {...register("surname")}
                className="p-2 mt-1 block w-full rounded-md text-gray-700 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter your username"
                required
              />
            </div>
            {errors?.surname && (
              <p className="text-red-400">{errors.surname?.message}</p>
            )}
            <div className="mb-4">
              <label
                htmlFor="username"
                className=" text-left block text-sm font-medium text-gray-700"
              >
                User Name
              </label>
              <input
                type="text"
                id="username"
                defaultValue={data?.name}
                {...register("username")}
                className="p-2 mt-1 block w-full rounded-md text-gray-700 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter your username"
                required
              />
            </div>
            {errors?.name && (
              <p className="text-red-400">{errors.name?.message}</p>
            )}
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
                placeholder="Enter your address"
                required
              />
            </div>
            {errors.address?.message && (
              <p className="text-red-400">{errors.address?.message}</p>
            )}
          </section>
          <section className="w-full h-full items-center flex flex-wrap gap-x-3 gap-y-4">
            <div className="mb-4">
              <label
                htmlFor="subjects"
                className=" text-left  block text-sm font-medium text-gray-700"
              >
                Subjects
              </label>
              <select
                multiple
                id="subjects"
                // defaultValue={data?.subjects}
                {...register("subjects")}
                className="p-2 mt-1 block min-w-[100px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              >
                {subjects &&
                  subjects.map((subject: { id: number; name: string }) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
              </select>
            </div>
            {errors.subjects?.message && (
              <p className="text-red-400">{errors.subjects?.message}</p>
            )}

            <div className="mb-4">
              <label
                htmlFor="lessons"
                className=" text-left  block text-sm font-medium text-gray-700"
              >
                lessons
              </label>
              <select
                multiple
                id="lessons"
                defaultValue={data?.lessons.map((lesson: { id: string }) =>
                  lesson.id.toString()
                )}
                {...register("lessons")}
                className="p-2 mt-1 block min-w-[100px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              >
                {lessons &&
                  lessons.map((lesson: { id: number; name: string }) => (
                    <option key={lesson.id} value={lesson.id}>
                      {lesson.name}
                    </option>
                  ))}
              </select>
            </div>
            {errors.lessons?.message && (
              <p className="text-red-400">{errors.lessons?.message}</p>
            )}

            <div className="mb-4">
              <label
                htmlFor="classes"
                className=" text-left  block text-sm font-medium text-gray-700"
              >
                classes
              </label>
              <select
                multiple
                id="classes"
                defaultValue={data?.classes}
                {...register("classes")}
                className="p-2 mt-1 block min-w-[100px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              >
                {classes &&
                  classes.map((className: { id: number; name: string }) => (
                    <option key={className.id} value={className.id}>
                      {className.name}
                    </option>
                  ))}
              </select>
            </div>
            {errors.classes?.message && (
              <p className="text-red-400">{errors.classes?.message}</p>
            )}
            <div className="mb-4">
              <label
                htmlFor="birthday"
                className=" text-left  block text-sm font-medium text-gray-700"
              >
                Birthday
              </label>

              <input
                type="date"
                id="birthday"
                {...register("birthday")}
                defaultValue={
                  data?.birthday
                    ? new Date(data.birthday).toISOString().split("T")[0]
                    : ""
                }
                className="p-2 mt-1 block min-w-[100px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            {errors.birthday?.message && (
              <p className="text-red-400">{errors.birthday?.message}</p>
            )}

            <div className="mb-4">
              <label
                htmlFor="Sex"
                className=" text-left  block text-sm font-medium text-gray-700"
              >
                Sex
              </label>

              <select
                id="sex"
                {...register("sex")}
                defaultValue={data?.sex}
                className="p-2 mt-1 block min-w-[100px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              >
                <option value={"MALE"}>Male</option>
                <option value={"FEMALE"}>Female</option>
              </select>
            </div>
            {errors.sex?.message && (
              <p className="text-red-400">{errors.sex?.message}</p>
            )}

            <div className="mb-4">
              <label
                htmlFor="bloodType"
                className=" text-left  block text-sm font-medium text-gray-700"
              >
                Blood Type
              </label>

              <input
                type="input"
                id="bloodType"
                {...register("bloodType")}
                defaultValue={data?.bloodType}
                className="p-2 mt-1 block min-w-[100px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              ></input>
            </div>

            {errors.sex?.message && (
              <p className="text-red-400">{errors.sex?.message}</p>
            )}
          </section>
        </div>
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

        {errors.root && <p className="text-red-400">{errors.root?.message}</p>}
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
