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
import InputField from "../InputField";

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
    // resolver: zodResolver(StudntSchema),
    defaultValues: {
      ...data,
      //   attendances: data?.attendances || [],
      //   results: data?.results || [],
      birthday: data?.birthday
        ? new Date(data.birthday).toISOString().split("T")[0]
        : "",
    },
  });

  console.log("Errors: ", errors);
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
    let imgUrl;
    const file = data.img && data.img instanceof FileList ? data.img[0] : null;
    if (file) {
      imgUrl = await uploadPhoto(file);
    }

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
      img: imgUrl ? (imgUrl?.url as string) : undefined,
    };

    const result = StudntSchema.safeParse(transformedData);
    if (result.success) {
      console.log("Validation succeeded:", result.data);
      // Submit the data to your backend
    } else {
      console.error("Validation failed:", result.error);
      result.error.errors.forEach((error) => {
        setError(error.path[0] as keyof StudentSchemaType, {
          type: "manual",
          message: error.message,
        });
      });
    }

    if (!data || typeof data !== "object") {
      throw new Error(
        "Invalid payload: Expected an object, received " + typeof data,
      );
    }
    try {
      if (title == "update") {
        if (data?.id && result.success) {
          const res = await updateStudent(data?.id, result.data);

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
        const res = await createStudent(result.data);
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
            <InputField
              label="Id"
              name="id"
              defaultValue={data?.id}
              register={register}
              errors={errors.id}
            />
            <InputField
              label="Name"
              name="name"
              defaultValue={data?.name}
              register={register}
              errors={errors?.name}
            />

            <InputField
              label="Surname"
              name="surname"
              defaultValue={data?.surname}
              register={register}
              errors={errors?.surname}
            />

            <InputField
              label="Username"
              name="username"
              defaultValue={data?.username}
              register={register}
              errors={errors?.username}
            />
            <InputField
              label="Email"
              name="email"
              defaultValue={data?.email}
              register={register}
              errors={errors?.email}
            />

            <InputField
              label="Phone"
              name="phone"
              defaultValue={data?.phone}
              register={register}
              errors={errors?.phone}
            />
            <InputField
              label="Address"
              name="address"
              defaultValue={data?.address}
              register={register}
              errors={errors?.address}
            />
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
                      {parent.name}
                    </option>
                  ))}
              </select>
            </div>
            {errors.parentId?.message && (
              <p className="text-red-400">{errors.parentId?.message}</p>
            )}

            <InputField
              label="Birth Date"
              name="birthday"
              defaultValue={data?.birthday.toISOString().split("T")[0]}
              register={register}
              errors={errors.birthday}
              type="date"
            />

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

            <InputField
              label="Blood Type"
              name="bloodType"
              defaultValue={data?.bloodType}
              register={register}
              errors={errors?.bloodType}
            />

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
