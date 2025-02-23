"use server";

import { prisma } from "@/app/libs/prisma";
import { TeacherProps, TeacherSchemaType } from "@/app/libs/types";
import { revalidatePath } from "next/cache";
import { PER_PAGE } from "../libs/constants";
import { z } from "zod";

export const getTeachers = async () => {
  const teachers: TeacherProps[] = await prisma.teacher.findMany({
    include: { classes: true, subjects: true, lessons: true },
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
        classes: { select: { id: true, name: true, students: true } },
        subjects: true,
        lessons: true,
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
export async function createTeacher(data: TeacherSchemaType) {
  try {
    const response = await prisma.teacher.create({
      data: {
        id: data.id,
        name: data.name,
        username: data.username,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: new Date(data.birthday),
        lessons: {
          connect: data.lessons?.map((lesson: string) => ({
            id: Number(lesson),
          })),
        },
        classes: {
          connect: data?.classes?.map((className: string) => ({
            id: Number(className),
          })),
        },
        subjects: {
          connect: data.subjects?.map((subject: string) => ({
            id: Number(subject),
          })),
        },
      },
    });
    return { success: true, message: "Form created successfully!" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      };
    } else {
      return {
        success: false,
        message: "An error occurred while submitting the form.",
      };
    }
  }
}

function calculateLessonUpdates(
  existingLessonIds: number[] | null,
  newLessonIds: number[] | null
) {
  const lessonsToConnect =
    newLessonIds?.filter((id) => !existingLessonIds?.includes(id)) || [];
  const lessonsToDisconnect =
    existingLessonIds?.filter((id) => !newLessonIds?.includes(id)) || [];
  return { lessonsToConnect, lessonsToDisconnect };
}

// Update a post
export async function updateTeacher(id: string, data: TeacherSchemaType) {
  // console.log("Data From FE : ", JSON.stringify(data));

  if (!data) {
    throw new Error("Invalid data provided");
  }

  if (!data || !data.lessons || !data.classes || !data.subjects) {
    throw new Error("Invalid data provided");
  }

  try {
    const selectedTeacher = await prisma.teacher.findUnique({
      where: { id },
      include: { lessons: true },
    });

    if (!selectedTeacher) {
      throw new Error("Teacher not found");
    }

    const lessonsExist: number[] = selectedTeacher?.lessons.map(
      (lesson) => lesson.id
    );

    const lessonsNew: number[] | [] = data
      ? data.lessons.map((lesson) => Number(lesson))
      : [];

    const { lessonsToConnect, lessonsToDisconnect } = calculateLessonUpdates(
      lessonsExist,
      lessonsNew
    );

    await prisma.lesson.updateMany({
      where: { id: { in: lessonsToDisconnect } },
      data: { teacherId: "teacher9" },
    });

    const responce = await prisma.teacher.update({
      where: { id: selectedTeacher?.id },
      data: {
        id: data.id,
        name: data.name,
        username: data.username,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: new Date(data.birthday),
        lessons: {
          // disconnect: lessonsToDisconnect?.map((id) => ({ id })),
          connect: lessonsToConnect?.map((id) => ({ id })),
        },
        classes: {
          set: data?.classes?.map((className) => ({ id: Number(className) })),
        },
        subjects: {
          set: data.subjects?.map((subject: string) => ({
            id: Number(subject),
          })),
        },
      },
      include: {
        lessons: true,
      },
    });

    return { success: true, message: "Form updated successfully!" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      };
    } else {
      console.error("Error update teacher", error);
      return {
        success: false,
        message: "An error occurred while submitting the form.",
      };
    }
  }
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
