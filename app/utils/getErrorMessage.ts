import { Prisma } from "@prisma/client";
import { z } from "zod";

export const getErrorMessage = (
  error: unknown,
): {
  success: boolean;
  errors?: { path: string; message: string }[] | [];
  message?: string | undefined;
} => {
  let errorResponse;
  if (error instanceof z.ZodError) {
    errorResponse = {
      success: false,
      errors: error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      })),
    };
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2014") {
      errorResponse = {
        success: false,
        message:
          "Invalid operation: Cannot reassign lesson due to relation constraints.",
      };
    } else if (error.code === "P2003") {
      errorResponse = {
        success: false,
        message:
          "Foreign key constraint failed. Check if the lesson and teacher exist.",
      };
    } else {
      errorResponse = {
        success: false,
        message: "Foreign key constraint failed.",
      };
    }
  } else {
    errorResponse = {
      success: false,
      message: "An error occurred while submitting the form.",
    };
  }

  return errorResponse;
};
