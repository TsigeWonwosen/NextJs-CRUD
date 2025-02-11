"use server";

import { prisma } from "@/app/libs/prisma";
import { TeacherProps } from "@/app/libs/types";
import { Prisma, Teacher } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getTeachers = async () => {
  const teachers: TeacherProps[] = await prisma.teacher.findMany({
    include: { classes: true, subjects: true },
  });

  const totalStudents = await prisma.student.count();

  return { teachers, totalStudents };
};

// Create a new user
export async function createTeacher(data: Teacher) {
  await prisma.teacher.create({ data });
}

// Update a post
export async function updateTeacher(id: string, data: Teacher) {
  const selectedTeacher = await prisma.teacher.findUnique({
    where: { id },
  });

  return await prisma.student.update({
    where: { id: selectedTeacher?.id },
    data,
  });
}

//  Delete a post
export async function deleteTeacher(id: string) {
  const selectedTeacher = await prisma.teacher.findUnique({
    where: { id },
  });

  if (!selectedTeacher || !selectedTeacher.id) {
    throw new Error("Teacher is invalid or missing an ID");
  }
  try {
    await prisma.teacher.delete({
      where: {
        id: selectedTeacher.id,
      },
    });

    revalidatePath("/dashboard/teachers");
  } catch (error: any) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      console.log("Student not found:", id);
    } else {
      console.log("Error deleting student:", error);
    }
  }
}
