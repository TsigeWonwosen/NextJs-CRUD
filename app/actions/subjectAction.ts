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
  console.log("Subject : ", data);
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
        teachers: {
          connect: data.teachers?.map((teacher) => ({ id: teacher })),
        },
      },
    });

    revalidatePath("/dashboard/subjects");
  } catch (error) {
    console.log(error);
  }
}

// Update a post
export async function updateSubject({
  id,
  data,
}: {
  id: number;
  data: { name: string; id: number; teachers: string[] };
}) {
  return await prisma.subject.update({
    where: { id },
    data: {
      name: data.name,
      teachers: { set: data.teachers.map((teacher) => ({ id: teacher })) },
    },
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
