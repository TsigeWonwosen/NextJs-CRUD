"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ParentSchemaType, ParentSchema } from "@/app/libs/types";
import Image from "next/image";
import { capitalizeTitle } from "@/app/utils/capitalize";
import { createParent, updateParent } from "@/app/actions/parentAction";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ParentSchemaType>({});

  const router = useRouter();

  useEffect(() => {
    setValue(
      "students",
      data?.students.map((student: { id: string }) => student.id).toString(),
    );
  }, [id, setValue]);

  const onSubmit = async (data: ParentSchemaType) => {
    try {
      const transformedData = {
        ...data,
        students:
          typeof data.students === "string"
            ? (data.students as string)
                .split(",")
                .map((id) => Number(id))
                .filter((id) => !isNaN(id))
            : data.students,
      };

      const result = ParentSchema.safeParse(transformedData);
      if (result.success) {
        console.log("Validation succeeded:", result.data);
        if (title == "create") {
          if (result.success) {
            const res = await createParent(result.data);
            if (res && res.success) {
              toast.success(res.message, { autoClose: 3000 });
              reset();
              handleToggle();
              router.refresh();
            } else {
              if (res.errors) {
                res.errors.forEach((err) => {
                  setError(err.path as keyof ParentSchemaType, {
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

        if (title == "update") {
          if (data?.id && result.success) {
            const res = await updateParent(data?.id, result.data);
            if (result.success) {
              toast.success(res.message, { autoClose: 3000 });
              reset();
              handleToggle();
              router.refresh();
            } else {
              if (res.errors) {
                res.errors.forEach((err) => {
                  setError(err.path as keyof ParentSchemaType, {
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
      } else {
        console.error("Validation failed:", result.error);
        result.error.errors.forEach((error) => {
          setError(error.path[0] as keyof ParentSchemaType, {
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

      // reset();
    } catch (eror) {
      console.log(eror);
    }
  };
  const { students } = relatedData;
  console.log("Error: ", errors);
  return (
    <div className="relative z-10 flex h-max w-[90%] flex-col items-center rounded-lg bg-slate-950 p-10 shadow-md">
      <div
        className="z-70 absolute right-7 top-7 h-3 w-3 cursor-pointer"
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
        <section className="flex w-full flex-col md:flex-row md:gap-3">
          <section className="h-auto w-full">
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
                placeholder="Enter your Id"
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
                placeholder="Enter your address"
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
                Surname
              </label>
              <input
                type="text"
                id="surname"
                defaultValue={data?.surname}
                {...register("surname")}
                className="mt-1 block w-full rounded-md border-gray-300 p-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter your address"
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
                Username
              </label>
              <input
                type="text"
                id="username"
                defaultValue={data?.username}
                {...register("username")}
                className="mt-1 block w-full rounded-md border-gray-300 p-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter your username"
                required
              />
            </div>
            {errors?.username && (
              <p className="text-red-400">{errors.username?.message}</p>
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
          </section>
          <section className="h-auto w-full">
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

            {errors.address?.message && (
              <p className="text-red-400">{errors.address?.message}</p>
            )}
            <div className="mb-4">
              <label
                htmlFor="students"
                className="block text-left text-sm font-medium text-gray-700"
              >
                Students
              </label>
              <select
                multiple
                id="students"
                {...register("students")}
                className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              >
                {students.map((student: { id: string; name: string }) => {
                  return (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  );
                })}
              </select>
            </div>
            {errors.students?.message && (
              <p className="text-red-400">{errors.students?.message}</p>
            )}
          </section>
        </section>
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
