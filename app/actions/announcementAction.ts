"use server";

import { prisma } from "@/app/libs/prisma";
import { ClassProps } from "@/app/libs/types";
import { Class } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getClasses = async () => {
  const classes: ClassProps[] = await prisma.class.findMany({
    include: {
      students: true,
      events: true,
      lessons: true,
      announcements: true,
      grade: true,
    },
  });

  const totalClass = await prisma.class.count();

  return { classes, totalClass };
};

// Create a new user
export async function createClass(data: Class) {
  const response = await prisma.class.create({ data });

  return response;
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
    {
      console.log("Student not found:", id);
      throw new Error(`Student with ID ${id} not found`);
    }
  }
}
