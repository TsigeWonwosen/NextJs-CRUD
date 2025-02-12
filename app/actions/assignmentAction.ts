"use server";

import { prisma } from "@/app/libs/prisma";
import { AssignmentProps } from "@/app/libs/types";
import { Assignment } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { unknown } from "zod";

export const getAssignments = async () => {
  const totalAssignment: AssignmentProps[] = await prisma.assignment.findMany({
    include: {
      lesson: true,
      results: true,
    },
  });

  const totalClass = await prisma.assignment.count();

  return { totalAssignment, totalClass };
};

// Create a new user
export async function createClass(data: Assignment) {
  const response = await prisma.assignment.create({ data });

  revalidatePath("/dashboard/assignments");
  return response;
}

// Update a post
export async function updateClass(id: number, data: Assignment) {
  return await prisma.assignment.update({
    where: { id },
    data,
  });
}

//  Delete a post
export async function deleteClass(id: number) {
  try {
    const deleteUser = await prisma.assignment.delete({
      where: {
        id,
      },
    });

    if (!deleteUser) {
      throw new Error("Failed to delete student");
    }

    revalidatePath("/dashboard/assignments");
  } catch (error: any) {
    {
      console.log("Student not found:", id);
      throw new Error(`Student with ID ${id} not found`);
    }
  }
}
