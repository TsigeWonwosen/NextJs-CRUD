"use server";

import { prisma } from "@/app/libs/prisma";
import { ParentProps } from "@/app/libs/types";
import { Parent, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getParents = async () => {
  const parents: ParentProps[] = await prisma.parent.findMany({
    include: { students: true },
  });

  const totalparent = await prisma.parent.count();

  return { parents, totalparent };
};

// Create a new user
export async function createParent() {}

// Update a post
export async function updateParent(id: string, data: Parent) {
  const selectedParent = await prisma.parent.findUnique({
    where: { id },
  });
  console.log("selectedParent" + selectedParent);
  console.log("Data" + data);
  return await prisma.parent.update({
    where: { id: selectedParent?.id },
    data,
  });
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
