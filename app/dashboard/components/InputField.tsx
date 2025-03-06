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
      <div className="mb-4">
        <label
          htmlFor={name}
          className="block text-left text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <input
          type={type || "text"}
          id={name}
          defaultValue={defaultValue}
          {...register(name)}
          className="mt-1 block w-full rounded-md border-gray-300 p-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Enter your address"
        />
      </div>
      {errors?.message && <p className="text-red-400">{errors.message}</p>}
    </>
  );
}

export default InputField;
