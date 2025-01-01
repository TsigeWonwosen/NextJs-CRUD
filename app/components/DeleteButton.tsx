"use client";
import React from "react";
import { deleteStaff } from "../libs/action";

function DeleteButton({ _id }) {
  const hundleDelete = async () => {
    await deleteStaff(_id);
  };

  return (
    <button onClick={hundleDelete} className="text-red-900">
      X
    </button>
  );
}

export default DeleteButton;
