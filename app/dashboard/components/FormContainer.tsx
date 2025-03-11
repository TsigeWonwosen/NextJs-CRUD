import React from "react";
import FormModel from "./FormModel";
import { prisma } from "@/app/libs/prisma";

async function FormContainer({
  table,
  type,
  id,
  data,
}: {
  // table: "student" | "teacher" | "parent" | "class" | "subject";
  table: string;
  type: "delete" | "update" | "create";
  id?: string | number;
  data?: any;
}) {
  let relatedData = {};
  const teachers = await prisma.teacher.findMany({
    select: { id: true, name: true, surname: true },
  });

  const students = await prisma.student.findMany({
    select: { id: true, name: true, surname: true },
  });

  const lessons = await prisma.lesson.findMany({
    select: { id: true, name: true },
  });

  const announcements = await prisma.announcement.findMany({
    select: { id: true, title: true, classId: true },
  });
  const subjects = await prisma.subject.findMany({
    select: { id: true, name: true },
  });

  const grades = await prisma.grade.findMany({
    select: { id: true, level: true },
  });
  const classes = await prisma.class.findMany({
    select: { id: true, name: true },
  });

  const parents = await prisma.parent.findMany({
    select: { id: true, name: true, surname: true },
  });

  const results = await prisma.result.findMany({
    select: {
      id: true,
      studentId: true,
      assignmentId: true,
      examId: true,
      score: true,
    },
  });
  const attendances = await prisma.attendance.findMany({
    select: { id: true, studentId: true, date: true },
  });

  switch (table) {
    case "teacher":
      relatedData = { lessons, subjects, classes };
      break;
    case "student":
      relatedData = {
        teachers,
        grades,
        attendances,
        lessons,
        results,
        parents,
        classes,
      };
      break;
    case "parent":
      relatedData = { students };

      break;
    case "class":
      relatedData = { teachers, grades, announcements, lessons };
      break;
    case "subject":
      relatedData = { teachers, lessons };
      break;
    default:
      break;
  }

  return (
    <FormModel
      table={table}
      type={type}
      id={id}
      data={data}
      relatedData={relatedData}
    />
  );
}

export default FormContainer;
