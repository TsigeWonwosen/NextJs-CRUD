import { prisma } from "@/app/libs/prisma";
import { Class, Student } from "@prisma/client";

type StudentType = Student & { class: Class };

export const getStudents = async () => {
  const students: StudentType[] = await prisma.student.findMany({
    include: { class: true },
  });

  const totalStudents = await prisma.student.count();

  return { students, totalStudents };
};
