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
import InputField from "../InputField";
import { Student } from "@prisma/client";

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
    if (data?.students) {
      const studentsString = data.students.map(
        (student: { id: Student["id"] }) => student.id,
      );
      setValue("students", studentsString);
    }
  }, [id, setValue, data?.students]);

  const onSubmit = async (data: ParentSchemaType) => {
    if (!data || typeof data !== "object") {
      throw new Error(
        "Invalid payload: Expected an object, received " + typeof data,
      );
    }

    try {
      const transformedData = {
        ...data,
        students: data.students.map((students) => students),
      };

      const result = ParentSchema.safeParse(transformedData);
      if (result.success) {
        if (title == "create") {
          const res = await createParent(result.data);
          if (res && res.success) {
            toast.success(res.message, { autoClose: 3000 });
            handleToggle();
            router.refresh();
            reset();
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
        } else {
          if (title == "update") {
            if (data?.id) {
              const res = await updateParent(data?.id, result.data);
              console.log("Resp: " + res);
              if (res.success) {
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
        }
      } else {
        result.error.errors.forEach((error) => {
          setError(error.path[0] as keyof ParentSchemaType, {
            type: "manual",
            message: error.message,
          });
        });
      }
    } catch (eror) {
      console.log(eror);
    }
  };
  const { students } = relatedData;

  if (errors) console.log("Error: ", errors);

  return (
    <div className="relative flex h-screen w-[90%] flex-col items-center overflow-scroll rounded-lg bg-slate-950 p-10 shadow-md lg:w-[70%]">
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
        className="h-auto w-full bg-slate-950 p-5"
      >
        <section className="flex w-full flex-col">
          <InputField
            label="Id"
            name="id"
            register={register}
            defaultValue={data?.id}
            errors={errors.id}
          />

          <div className="flex w-full flex-col gap-2 md:flex-row">
            <InputField
              label="Name"
              name="name"
              register={register}
              defaultValue={data?.name}
              errors={errors?.name}
            />

            <InputField
              label="Surname"
              name="surname"
              register={register}
              defaultValue={data?.surname}
              errors={errors?.surname}
            />
          </div>
          <div className="flex w-full flex-col gap-2 md:flex-row">
            <InputField
              label="Username"
              name="username"
              register={register}
              defaultValue={data?.username}
              errors={errors?.username}
            />

            <InputField
              label="Email"
              name="email"
              register={register}
              defaultValue={data?.email}
              errors={errors?.email}
              type="email"
            />
          </div>

          <div className="flex w-full flex-col gap-2 md:flex-row">
            <div className="w-1/2">
              <InputField
                label="Phone"
                name="phone"
                register={register}
                defaultValue={data?.phone}
                errors={errors?.phone}
                type="phone"
              />
              <InputField
                label="Address"
                name="address"
                register={register}
                defaultValue={data?.address}
                errors={errors?.address}
              />
            </div>

            <div className="mb-4 w-1/2">
              <label
                htmlFor="students"
                className="mb-1 block text-left text-sm font-medium text-gray-700"
              >
                Students
              </label>
              <select
                multiple
                id="students"
                {...register("students")}
                className="mb-4 w-full rounded-md border-0 bg-slate-900 p-2 text-gray-300 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              >
                {students.map((student: { id: string; name: string }) => {
                  return (
                    <option
                      key={student.id}
                      value={student.id}
                      className="bg-slate-600"
                    >
                      {student.name}
                    </option>
                  );
                })}
              </select>
            </div>
            {errors.students?.message && (
              <p className="text-red-400">{errors.students?.message}</p>
            )}
          </div>
        </section>
        {errors.root?.message && (
          <p className="mb-1 text-red-400">{errors.root?.message}</p>
        )}
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
