"use server";

import { prisma } from "@/app/libs/prisma";
import { ClassProps } from "@/app/libs/types";
import { Class, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getClass = async () => {
  const totalclasses: ClassProps[] = await prisma.class.findMany({
    include: {
      supervisor: true,
      lessons: true,
      students: true,
      grade: true,
      events: true,
      announcements: true,
    },
  });

  const totalClass = await prisma.class.count();

  return { totalclasses, totalClass };
};

// Create a new user
export async function createClass(data: Class) {
  try {
    const response = await prisma.class.create({ data });

    revalidatePath("/dashboard/classes");
    return response;
  } catch (error) {
    console.error(error);
  }
}

// Update a post
export async function updateClass(id: number, data: Class) {
  return await prisma.class.update({
    where: { id },
    data,
  });
}

//  Delete a post
export async function deleteClass(id: number) {
  try {
    const deleteUser = await prisma.class.delete({
      where: {
        id,
      },
    });

    if (!deleteUser) {
      throw new Error("Failed to delete student");
    }

    revalidatePath("/dashboard/classes");
  } catch (error: any) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      console.log("Student not found:", id);
      throw new Error(`Student with ID ${id} not found`);
    } else {
      console.log("Error deleting student:", error);
      throw new Error(`Failed to delete student: ${error?.message}`);
    }
  }
}
