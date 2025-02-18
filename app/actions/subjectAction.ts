"use server";

import { prisma } from "@/app/libs/prisma";
import { SubjectchemaType, SubjectProps } from "@/app/libs/types";
import { Prisma, Subject, Teacher } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getSubjects = async () => {
  const subjects: SubjectProps[] = await prisma.subject.findMany({
    include: { teachers: true, lessons: true },
  });

  const totalSubjects = await prisma.subject.count();

  return { subjects, totalSubjects };
};

// Create a new user
export async function createSubject(data: SubjectchemaType) {
  try {
    const response = await prisma.subject.create({ data: { name: data.name } });

    // revalidatePath("/dashboard/subjects");
    return response;
  } catch (error) {
    console.log(error);
  }
}

// Update a post
export async function updateSubject(id: number, data: Subject) {
  return await prisma.subject.update({
    where: { id },
    data,
  });
}

//  Delete a post
export async function deleteSubject(id: number) {
  try {
    const deleteUser = await prisma.subject.delete({
      where: {
        id,
      },
    });

    if (!deleteUser) {
      throw new Error("Failed to delete student");
    }

    revalidatePath("/dashboard/subjects");
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
