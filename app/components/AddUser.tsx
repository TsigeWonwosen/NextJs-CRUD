"use client";
import React, { startTransition, useActionState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addUser } from "@/app/libs/action";
import { z } from "zod";
import { useRouter } from "next/navigation";

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
  role: z.enum(["admin", "teacher", "student"], {
    message: "Role is requiered.",
  }),
});

type UserProps = z.infer<typeof schema>;

function AddUser({ handleLogin }: { handleLogin: () => void }) {
  const [state, action, isPanding] = useActionState(addUser, null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<UserProps>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<UserProps> = async (data: UserProps) => {
    try {
      startTransition(async () => {
        await action(data);
      });

      if (!state?.success) {
        throw new Error("Server is Not Responding.");
      }
      handleLogin();
      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        setError("root", { type: "server", message: error.message });
      } else if (typeof error === "string") {
        setError("root", { type: "server", message: error });
      } else {
        setError("root", {
          type: "server",
          message: "An unexpected error occurred.",
        });
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[300px]">
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
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
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
        <p>
          have you already account?{" "}
          <span onClick={handleLogin} className="cursor-pointer">
            LogIn{" "}
          </span>
        </p>
      </form>
    </>
  );
}

export default AddUser;
