"use server";

import { prisma } from "@/app/libs/prisma";
import { Class, Prisma, Student } from "@prisma/client";
import { revalidatePath } from "next/cache";

type StudentType = Student & { class: Class };

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
export async function createStudent() {
  let i = 200;
  const newData: Student = {
    id: `student${i}`,
    username: `wonde${i}`,
    name: `shi${i}`,
    surname: `SSurname ${i}`,
    email: `student${i}@example.com`,
    phone: `987-654-321${i}`,
    address: `Address${i}`,
    bloodType: "O-",
    sex: i % 2 === 0 ? "MALE" : "FEMALE",
    parentId: `parentId${Math.ceil(i / 2) % 25 || 25}`,
    gradeId: (i % 6) + 1,
    classId: (i % 6) + 1,
    birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
    img: null,
    createdAt: new Date(),
  };

  return await prisma.student.create({
    data: newData,
  });
}

// Update a post
export async function updatePost() {
  const email = "student200@example.com" as string;

  const selectedStudent = await prisma.student.findUnique({
    where: { email },
  });
  console.log("Student to delete:", selectedStudent);

  return await prisma.student.update({
    where: { id: selectedStudent?.id },
    data: { name: "Abel", surname: "Wonde", address: "Jimma Ethiopia" },
  });
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
