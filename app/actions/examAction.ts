"use server";

import { prisma } from "@/app/libs/prisma";
import { ExamList, TeacherProps } from "@/app/libs/types";
import { Exam } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getExams = async () => {
  const exams: ExamList[] = await prisma.exam.findMany({
    include: { lesson: true, results: true },
  });

  const totalExam = await prisma.exam.count();

  return { exams, totalExam };
};

// Create a new user
export async function createExam(data: Exam) {
  await prisma.exam.create({ data });
  revalidatePath("/dashboard/exams");
}

// Update a post
export async function updateExam(id: number, data: Exam) {
  const selectedExam = await prisma.exam.findUnique({
    where: { id },
  });

  const updatedExam = await prisma.exam.update({
    where: { id: selectedExam?.id },
    data,
  });
  revalidatePath("/dashboard/exams");
  return updateExam;
}

//  Delete a post
export async function deleteExam(id: number) {
  const selectedExam = await prisma.exam.findUnique({
    where: { id },
  });

  if (!selectedExam || !selectedExam.id) {
    throw new Error("Teacher is invalid or missing an ID");
  }
  try {
    await prisma.exam.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard/exams");
  } catch (error: any) {
    console.log("Error deleting teacher:", error);
  }
}
