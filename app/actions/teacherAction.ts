"use server";

import { prisma } from "@/app/libs/prisma";
import { TeacherProps } from "@/app/libs/types";
import { Teacher } from "@prisma/client";
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
  revalidatePath("/dashboard/teachers");
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
  console.log("Teacher Id: ", selectedTeacher.id);
  try {
    await prisma.teacher.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard/teachers");
  } catch (error: any) {
    console.log("Error deleting teacher:", error);
  }
}
