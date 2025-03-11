"use server";

import { prisma } from "@/app/libs/prisma";
import { revalidatePath } from "next/cache";
import { getErrorMessage } from "../utils/getErrorMessage";
import { StudentSchemaType } from "../libs/types";

export async function getStudentsWithQuery(searchParams: {
  search?: string;
  name?: string;
  id?: string;
  sort?: string;
}) {
  const { search, name, id, sort } = searchParams;

  const where: any = {};

  if (id) {
    where.id = isNaN(Number(id)) ? id : Number(id); // Handle string & number IDs
  }

  if (name) {
    where.name = { contains: name, mode: "insensitive" }; // Case-insensitive search
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } }, // Search by name
      { id: isNaN(Number(search)) ? search : Number(search) }, // Search by ID
    ];
  }

  const [students, totalStudents] = await prisma.$transaction([
    prisma.student.findMany({
      where,
      include: {
        results: true, // Example of including relations
        attendances: true,
      },
      orderBy: { name: sort === "asc" ? "asc" : "desc" },
    }),

    prisma.student.count(),
  ]);

  return { students, totalStudents };
}

export const getStudents = async () => {
  const students = await prisma.student.findMany({
    include: {
      results: true,
      attendances: true,
    },
    orderBy: { id: "asc" },
  });
  const totalStudents = await prisma.student.count();

  return { students, totalStudents };
};

// Fetch all users with their posts
export async function getUsersWithPosts() {
  return await prisma.student.findMany({
    include: { class: true },
  });
}

// Create a new user
export async function createStudent(data: any) {
  try {
    if (data.attendances.length > 0 || data.results.length > 0) {
      const student = await prisma.student.create({
        data: {
          ...data,
          attendances: {
            connect: data.attendances.map((attendance: number) => ({
              id: attendance,
            })),
          },
          results: {
            connect: data.results.map((id: number) => ({ id })),
          },
        },
        include: {
          results: true,
          attendances: true,
        },
      });
    }
    revalidatePath("/dashboard/students");
    return { success: true, message: "Form updated successfully!" };
  } catch (error: any) {
    console.log("Error : ", error);
    const message = getErrorMessage(error);
    return message;
  }
}

// Update a post
type updatStudentSchema = Omit<StudentSchemaType, "img"> & { img: any };

export async function updateStudent(id: string, data: updatStudentSchema) {
  const selectedStudent = await prisma.student.findUnique({
    where: { id },
  });
  try {
    if (data.attendances.length > 0 || data.results.length > 0) {
      const student = await prisma.student.update({
        where: { id: selectedStudent?.id },
        data: {
          ...data,
          attendances: {
            connect: data.attendances.map((attendance: number) => ({
              id: attendance,
            })),
          },
          results: {
            connect: data.results.map((id: number) => ({ id })),
          },
        },
        include: {
          results: true,
          attendances: true,
        },
      });
    }
    revalidatePath("/dashboard/students");

    return { success: true, message: "Form updated successfully!" };
  } catch (error: any) {
    console.log("Error : ", error);
    const message = getErrorMessage(error);
    return message;
  }
}

//  Delete a post
export async function deleteStudent(id: string) {
  const selectedStudent = await prisma.student.findUnique({
    where: { id },
  });

  if (!selectedStudent || !selectedStudent.id) {
    throw new Error("Selected student is invalid or missing an ID");
  }
  try {
    const deleteUser = await prisma.student.delete({
      where: {
        id: selectedStudent?.id,
      },
    });

    if (!deleteUser) {
      throw new Error("Failed to delete student");
    }

    revalidatePath("/dashboard/students");
  } catch (error: any) {
    const message = getErrorMessage(error);
    return message;
  }
}
