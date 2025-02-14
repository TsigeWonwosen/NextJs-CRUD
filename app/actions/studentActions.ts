"use server";

import { prisma } from "@/app/libs/prisma";
import { Class, Prisma, Student } from "@prisma/client";
import { revalidatePath } from "next/cache";

type StudentType = Student & { class: Class };

export async function getStudentsWithQuery(searchParams: {
  search?: string;
  name?: string;
  id?: string;
}) {
  const { search, name, id } = searchParams;

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

  const students = await prisma.student.findMany({
    where,
    include: {
      results: true, // Example of including relations
    },
  });

  return students;
}
export const getStudents = async () => {
  const students: StudentType[] = await prisma.student.findMany({
    include: { class: true },
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
export async function createStudent(data: Student) {
  const student = await prisma.student.create({ data });

  revalidatePath("/dashboard/students");
  return student;
}

// Update a post
export async function updateStudent(id: string, data: Student) {
  const selectedStudent = await prisma.student.findUnique({
    where: { id },
  });

  const response = await prisma.student.update({
    where: { id: selectedStudent?.id },
    data,
  });
  revalidatePath("/dashboard/students");
  return response;
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
