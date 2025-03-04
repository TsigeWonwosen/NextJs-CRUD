"use server";

import { prisma } from "@/app/libs/prisma";
import { ParentProps } from "@/app/libs/types";
import { Parent, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { PER_PAGE } from "../libs/constants";

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
export async function createParent() {}

// Update a post
export async function updateParent(id: string, data: Parent) {
  const selectedParent = await prisma.parent.findUnique({
    where: { id },
  });

  return await prisma.parent.update({
    where: { id: selectedParent?.id },
    data,
  });
  revalidatePath("/dashboard/parents");
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
