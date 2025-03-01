"use server";

import { prisma } from "@/app/libs/prisma";
import { Prisma, Student } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { StudentSchemaType } from "../libs/types";
import { getErrorMessage } from "../utils/getErrorMessage";
import Attendaces from "../dashboard/attendance/page";

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
      attendances: true,
    },
  });
  ``;
  return students;
}
export const getStudents = async () => {
  const students = await prisma.student.findMany({
    include: {
      results: true,
      attendances: true,
    },
    orderBy: { id: "asc" },
  });
  // console.log("Students", students[0]);
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
    const student = await prisma.student.create({ data });

    // revalidatePath("/dashboard/students");
    return { success: true, message: "Form created successfully!" };
  } catch (error: any) {
    const message = getErrorMessage(error);
    return message;
  }
}

// Update a post
export async function updateStudent(id: string, data: any) {
  console.log("Student data : ", data);
  const selectedStudent = await prisma.student.findUnique({
    where: { id },
  }); // Find the student to update by ID
  try {
    const student = await prisma.student.update({
      where: { id: selectedStudent?.id },
      data: {
        ...data,
        img: typeof data.img === "string" ? data.img : undefined,
      },
      include: {
        results: true,
        attendances: true,
      },
    });
    // revalidatePath("/dashboard/students");
    console.log("Resonse : ", student);
    return { success: true, message: "Form updated successfully!" };
  } catch (error: any) {
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
