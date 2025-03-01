"use client";
import React, { useState, FormEvent, use, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StudntSchema, StudentSchemaType } from "@/app/libs/types";
import Image from "next/image";
import { capitalizeTitle } from "@/app/utils/capitalize";

import { uploadPhoto } from "@/app/actions/uploadPhoto";
import { createStudent, updateStudent } from "@/app/actions/studentActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function StudentForm({
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
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StudentSchemaType>({
    resolver: zodResolver(StudntSchema),
    defaultValues: {
      ...data,
      attendances: data?.attendances?.join(",") || "",
      results: data?.results,
      birthday: data?.birthday
        ? new Date(data.birthday).toISOString().split("T")[0]
        : "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (data) {
      setValue(
        "attendances",
        data.attendances.map((item: any) => item.id).toString(),
      );
      setValue("results", data.results.map((item: any) => item.id).toString());
    }
  }, [id, setValue]);

  const onSubmit = async (data: StudentSchemaType) => {
    const transformedData = {
      ...data,
      attendances:
        typeof data.attendances === "string"
          ? (data.attendances as string)
              .split(",")
              .map((id) => Number(id))
              .filter((id) => !isNaN(id))
          : data.attendances,
      results:
        typeof data.results === "string"
          ? (data.results as string)
              .split(",")
              .map((id) => Number(id))
              .filter((id) => !isNaN(id))
          : data.results,
    };

    if (!data || typeof data !== "object") {
      throw new Error(
        "Invalid payload: Expected an object, received " + typeof data,
      );
    }
    try {
      if (title == "update") {
        if (data.id) {
          let imgUrl;
          const file =
            data.img && data.img instanceof FileList ? data.img[0] : null;
          if (file) {
            imgUrl = await uploadPhoto(file);
          }
          const res = await updateStudent(data?.id, {
            ...data,
            img: imgUrl?.url as string,
            attendances: {
              connect: data.attendances.map((id) => ({ id })), // Connect to existing attendances
            },
            results: {
              connect: data.results.map((id) => ({ id })), // Connect to existing results
            },
          });
          if (res.success) {
            toast.success(res.message, { autoClose: 3000 });
            reset();
            handleToggle();
            router.refresh();
          } else {
            if (res.errors) {
              res.errors.forEach((err) => {
                setError(err.path as keyof StudentSchemaType, {
                  type: "Server",
                  message: err.message,
                });
                toast.error(err.message);
              });
            } else {
              setError("root", { message: res.message, type: "server" });
              toast.error(res.message);
            }
          }
        }
      }
      if (title == "create") {
        const res = await createStudent(data);
        if (res.success) {
          toast.success(res.message, { autoClose: 3000 });
          reset();
          handleToggle();
          router.refresh();
        }
      }
    } catch (error: any) {
      if (error instanceof Error) {
        toast.error(error.message);
        setError("root", { message: error.message, type: "server" });
      } else {
        console.error(error);
      }
      if (error.errors) {
        error.errors.forEach((err: { path: string[]; message: string }) => {
          setError("root", {
            type: "server",
            message: err.message,
          });
        });
      }
    }
  };

  const handlePhotoPreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]; // Get the first file
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile)); // Generate preview
    }
  };
  const { attendances, results, classes, parents, grades } = relatedData;

  return (
    <div className="relative z-10 flex h-full w-full flex-col items-center rounded-lg bg-slate-950 p-10 shadow-md sm:w-[90%] md:w-[70%]">
      <div
        className="z-70 absolute right-7 top-5 h-3 w-3 cursor-pointer"
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
        encType="multipart/form-data"
      >
        <div className="flex flex-col items-start justify-between gap-x-3 xl:flex-row">
          <section className="h-full w-full">
            <div className="mb-4">
              <label
                htmlFor="id"
                className="block text-left text-sm font-medium text-gray-700"
              >
                Id
              </label>
              <input
                type="text"
                id="id"
                defaultValue={data?.id}
                {...register("id")}
                className="mt-1 block w-full rounded-md border-gray-300 p-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter your address"
              />
            </div>
            {errors?.id && <p className="text-red-400">{errors.id?.message}</p>}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-left text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                defaultValue={data?.name}
                {...register("name")}
                className="mt-1 block w-full rounded-md border-gray-300 p-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                className="block text-left text-sm font-medium text-gray-700"
              >
                SurName
              </label>
              <input
                type="text"
                id="surname"
                defaultValue={data?.surname}
                {...register("surname")}
                className="mt-1 block w-full rounded-md border-gray-300 p-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                className="block text-left text-sm font-medium text-gray-700"
              >
                User Name
              </label>
              <input
                type="text"
                id="username"
                defaultValue={data?.name}
                {...register("username")}
                className="mt-1 block w-full rounded-md border-gray-300 p-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                placeholder="Enter your address"
                required
              />
            </div>
            {errors.address?.message && (
              <p className="text-red-400">{errors.address?.message}</p>
            )}
          </section>
          <section className="flex h-full w-full flex-wrap items-center gap-x-3 gap-y-4">
            <div className="mb-4">
              <label
                htmlFor="attendances"
                className="block text-left text-sm font-medium text-gray-700"
              >
                Attedances
              </label>
              <select
                multiple
                id="attendances"
                {...register("attendances")}
                className="mt-1 block min-w-[100px] rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              >
                {attendances &&
                  attendances.map(
                    (attendance: { id: number; studentId: string }) => (
                      <option key={attendance.id} value={attendance.id}>
                        {attendance.studentId}
                      </option>
                    ),
                  )}
              </select>
            </div>
            {errors.attendances?.message && (
              <p className="text-red-400">{errors.attendances?.message}</p>
            )}

            <div className="mb-4">
              <label
                htmlFor="classId"
                className="block text-left text-sm font-medium text-gray-700"
              >
                Class Id
              </label>
              <select
                id="classId"
                defaultValue={parseInt(data?.classId)}
                {...register("classId")}
                className="mt-1 block min-w-[100px] rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              >
                {classes &&
                  classes.map((item: { id: number; name: string }) => (
                    <option
                      key={item.id}
                      value={
                        typeof item.id === "number"
                          ? item.id
                          : parseInt(item.id)
                      }
                    >
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            {errors.classId?.message && (
              <p className="text-red-400">{errors.classId?.message}</p>
            )}

            <div className="mb-4">
              <label
                htmlFor="gradeId"
                className="block text-left text-sm font-medium text-gray-700"
              >
                Grade Id
              </label>
              <select
                id="gradeId"
                defaultValue={parseInt(data?.gradeId)}
                {...register("gradeId")}
                className="mt-1 block min-w-[100px] rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              >
                {grades &&
                  grades.map((item: { id: number; level: number }) => (
                    <option
                      key={item.id}
                      value={
                        typeof item.id === "number"
                          ? item.id
                          : parseInt(item.id)
                      }
                    >
                      {item.level}
                    </option>
                  ))}
              </select>
            </div>
            {errors.gradeId?.message && (
              <p className="text-red-400">{errors.gradeId?.message}</p>
            )}
            <div className="mb-4">
              <label
                htmlFor="lessons"
                className="block text-left text-sm font-medium text-gray-700"
              >
                results
              </label>
              <select
                multiple
                id="results"
                defaultValue={data?.results}
                {...register("results")}
                className="mt-1 block min-w-[100px] rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              >
                {results &&
                  results.map((result: { id: number; score: number }) => (
                    <option key={result.id} value={result.id}>
                      {result.score}
                    </option>
                  ))}
              </select>
            </div>
            {errors.results?.message && (
              <p className="text-red-400">{errors.results?.message}</p>
            )}

            <div className="mb-4">
              <label
                htmlFor="paretnId"
                className="block text-left text-sm font-medium text-gray-700"
              >
                Parent Id
              </label>
              <select
                id="paretnId"
                defaultValue={data?.paretnId}
                {...register("parentId")}
                className="mt-1 block min-w-[100px] rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              >
                {parents &&
                  parents.map((parent: { id: string; name: string }) => (
                    <option key={parent.id} value={String(parent.id)}>
                      {parent.name + " | " + parent.id}
                    </option>
                  ))}
              </select>
            </div>
            {errors.parentId?.message && (
              <p className="text-red-400">{errors.parentId?.message}</p>
            )}
            <div className="mb-4">
              <label
                htmlFor="birthday"
                className="block text-left text-sm font-medium text-gray-700"
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
                className="mt-1 block min-w-[100px] rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            {errors.birthday?.message && (
              <p className="text-red-400">{errors.birthday?.message}</p>
            )}

            <div className="mb-4">
              <label
                htmlFor="Sex"
                className="block text-left text-sm font-medium text-gray-700"
              >
                Sex
              </label>

              <select
                id="sex"
                {...register("sex")}
                defaultValue={data?.sex}
                className="mt-1 block min-w-[100px] rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                className="block text-left text-sm font-medium text-gray-700"
              >
                Blood Type
              </label>

              <input
                type="input"
                id="bloodType"
                {...register("bloodType")}
                defaultValue={data?.bloodType}
                className="mt-1 block min-w-[100px] rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              ></input>
            </div>

            {errors.sex?.message && (
              <p className="text-red-400">{errors.sex?.message}</p>
            )}

            <div className="mb-4 flex w-full flex-col items-center gap-y-4 md:flex-row md:gap-x-3">
              <label
                htmlFor="img"
                className="flex w-full flex-row items-center justify-start gap-2 text-left text-sm font-medium text-gray-700"
              >
                <Image
                  src={`/upload.png`}
                  alt="Upload Photo"
                  width={25}
                  height={25}
                />
                <span className="w-auto text-left text-sm font-medium text-gray-700">
                  Upload Photo
                </span>
              </label>
              <input
                id="img"
                type="file"
                {...register("img")}
                accept="image/*"
                onChange={handlePhotoPreview}
                className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            {errors.img?.message && typeof errors.img?.message === "string" && (
              <p className="text-red-400">Photo Error: {errors.img?.message}</p>
            )}
            {preview && (
              <Image
                src={preview}
                width={40}
                height={40}
                alt="Preview"
                className="mt-2 h-32 w-32 rounded object-cover"
              />
            )}

            {errors.root && (
              <p className="text-red-400">
                {errors.root.type + " : " + errors.root?.message}
              </p>
            )}
          </section>
        </div>

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

export default StudentForm;
