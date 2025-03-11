import React from "react";
import { FieldError } from "react-hook-form";

function InputField({
  label,
  name,
  type,
  defaultValue,
  register,
  errors,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue: any;
  register: any;
  errors: FieldError | undefined;
}) {
  return (
    <>
      <div className="mb-4 w-full">
        <label
          htmlFor={name}
          className="mb-1 block text-left text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <input
          type={type || "text"}
          id={name}
          defaultValue={defaultValue}
          {...register(name)}
          className="w-full rounded-md border-0 bg-slate-900 p-2 text-gray-300 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder={`Enter your ${name}`}
        />
      </div>
      {errors?.message && <p className="text-red-400">{errors.message}</p>}
    </>
  );
}

export default InputField;
