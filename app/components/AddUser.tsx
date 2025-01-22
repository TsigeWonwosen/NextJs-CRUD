"use client";
import React, { startTransition, useActionState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addUser } from "@/app/libs/action";
import { z } from "zod";

const schema = z.object({
  username: z
    .string()
    .min(4, { message: "User Name should atleast 4 charactor." }),
  email: z
    .string()
    .email({ message: "Invalid email addresss" })
    .min(4, { message: "User email should atleast 4 charactor.." }),
  password: z
    .string()
    .min(4, { message: "Password should atleast 4 charactor." }),
  role: z.enum(["admin", "staff", "geust"], {
    message: "Role is requiered.",
  }),
});

type UserType = {
  username: string;
  email: string;
  password: string;
  role: string;
};
function AddUser() {
  const [state, action, isPanding] = useActionState(addUser, null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserType>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<UserType> = async (data: UserType) => {
    startTransition(async () => {
      await action(data);
    });

    if (state?.success) {
      reset();
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="w-1/2 bg-slate-900 p-10 rounded-lg shadow-md flex flex-col items-center ">
      <h2 className="text-2xl font-bold mb-4 text-center text--">Add User</h2>
      {/* <form action={action} className="p-5 w-4/5"> */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-5 w-4/5">
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
            // name="username"
            {...register("username")}
            className="p-2 mt-1 block w-full rounded-md text-gray-700 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
            className=" text-left  block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            // name="email"
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
            htmlFor="password"
            className=" text-left  block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            // name="password"
            {...register("password")}
            className="p-2 mt-1 block w-full rounded-md text-gray-700 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter your password"
            required
          />
        </div>
        {errors.password?.message && (
          <p className="text-red-400">{errors.password?.message}</p>
        )}

        <div className="mb-4">
          <label
            htmlFor="role"
            className=" text-left  block text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <select
            id="role"
            // name="role"
            {...register("role")}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          >
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
            <option value="guest">Guest</option>
          </select>
        </div>
        {errors.role?.message && (
          <p className="text-red-400">{errors.role?.message}</p>
        )}

        <button
          type="submit"
          disabled={isPanding}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isPanding ? "adding..." : "Add user"}
        </button>
        {state?.error && <p className="text-red-500 mt-2">{state.error}</p>}
      </form>
    </div>
  );
}

export default AddUser;
