"use server";

import { prisma } from "@/app/libs/prisma";
import { ParentProps, ParentSchemaType } from "@/app/libs/types";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { PER_PAGE } from "../libs/constants";
import { getErrorMessage } from "../utils/getErrorMessage";

export const getParents = async () => {
  const parents: ParentProps[] = await prisma.parent.findMany({
    include: { students: true },
  });

  const totalparent = await prisma.parent.count();

  return { parents, totalparent };
};

export async function getParentsWithQuery(searchParams: {
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
        students: { some: { name: { contains: search, mode: "insensitive" } } },
      },
    ];
  }
  const p = page ? parseInt(page) : 1;

  const skip = (p - 1) * PER_PAGE;

  const [parents, totalparent] = await prisma.$transaction([
    prisma.parent.findMany({
      where,
      include: {
        students: true,
      },
      skip,
      take: PER_PAGE,
      orderBy: { name: "asc" },
    }),
    prisma.parent.count({
      where,
    }),
  ]);

  return { parents, totalparent };
}

// Create a new user
export async function createParent(data: ParentSchemaType) {
  try {
    await prisma.parent.create({
      data: {
        ...data,
        id: data.id ?? "",
        students: {
          connect: data.students.map((student: string) => ({
            id: String(student),
          })),
        },
      },
    });
    revalidatePath("/dashboard/parents");
    return { success: true, message: "Parent updated successfully." };
  } catch (error) {
    const message = getErrorMessage(error);
    return message;
  }
}

// Update a post
export async function updateParent(id: string, data: ParentSchemaType) {
  try {
    const updatedParent = await prisma.$transaction(async (prisma) => {
      const selectedParent = await prisma.parent.findUnique({
        where: { id },
        include: { students: true },
      });

      const existedStudents = selectedParent?.students.map(
        (student) => student.id,
      );

      const newStudentIds = data.students.map((student) => student);

      const studentsToDisconnect = existedStudents?.filter(
        (id) => !newStudentIds.includes(id),
      );

      const studentsToConnect = newStudentIds.filter(
        (id) => !existedStudents?.includes(id),
      );
      // Step 3: Ensure at least one student remains connected
      if (studentsToDisconnect?.length === existedStudents?.length) {
        throw new Error("Cannot disconnect all students from a parent.");
      }

      console.log("Old Student Disconnect :", studentsToDisconnect);
      console.log("new Student Connect :", studentsToConnect);

      await prisma.parent.update({
        where: { id: selectedParent?.id },
        data: {
          ...data,
          students: {
            disconnect: studentsToDisconnect?.map((id) => ({ id })),
          },
        },
      });

      return await prisma.parent.update({
        where: { id: selectedParent?.id },
        data: {
          ...data,
          students: {
            connect: studentsToConnect.map((student: string) => ({
              id: student,
            })),
          },
        },
        include: { students: true },
      });
    });
    revalidatePath("/dashboard/parents");
    return { success: true, message: "Parent updated successfully." };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error: " + error.message);
    }
    const message = getErrorMessage(error);
    return message;
  }
}

//  Delete a post
export async function deleteParent(id: string) {
  const selectedParent = await prisma.parent.findUnique({
    where: { id },
  });

  if (!selectedParent || !selectedParent.id) {
    throw new Error("Parent  is invalid or missing an ID");
  }
  try {
    const deleteUser = await prisma.parent.delete({
      where: {
        id: selectedParent?.id,
      },
    });

    if (!deleteUser) {
      throw new Error("Failed to delete student");
    }

    revalidatePath("/dashboard/parents");
  } catch (error: any) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      console.log("Parent not found:", id);
      throw new Error(`parent with ID ${id} not found`);
    } else {
      console.log("Error deleting Parent:", error);
      throw new Error(`Failed to delete student: ${error?.message}`);
    }
  }
}
