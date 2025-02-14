"use server";

import { prisma } from "@/app/libs/prisma";
import { TeacherProps } from "@/app/libs/types";
import { Teacher } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { PER_PAGE } from "../libs/constants";

export const getTeachers = async () => {
  const teachers: TeacherProps[] = await prisma.teacher.findMany({
    include: { classes: true, subjects: true },
  });

  const totalStudents = await prisma.student.count();

  return { teachers, totalStudents };
};

//get Teacher with Query
export async function getTeachersWithQuery(searchParams: {
  search?: string;
  name?: string;
  classId?: string;
  page?: string;
}) {
  const { page, search, name, classId } = searchParams;

  const where: any = {};

  if (classId) {
    where.id = isNaN(Number(classId)) ? classId : Number(classId);
  }

  if (name) {
    where.name = { contains: name, mode: "insensitive" };
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { id: isNaN(Number(search)) ? search : Number(search) },
      {
        subjects: { some: { name: { contains: search, mode: "insensitive" } } },
      },
    ];
  }
  const p = page ? parseInt(page) : 1;

  const skip = (p - 1) * PER_PAGE;

  const [teachers, teacherCounts] = await prisma.$transaction([
    prisma.teacher.findMany({
      where,
      include: {
        classes: { select: { name: true, students: true } },
        subjects: true,
      },
      skip,
      take: PER_PAGE,
      orderBy: { name: "asc" },
    }),
    prisma.teacher.count({
      where,
    }),
  ]);

  return { teachers, teacherCounts };
}

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
