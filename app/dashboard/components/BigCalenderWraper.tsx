import React from "react";
import BigCalander from "./BigCalander";
import { prisma } from "@/app/libs/prisma";

async function BigCalenderWraper() {
  const responce = await prisma.lesson.findMany();

  type lessonType = {
    title: string;
    allDay: boolean;
    start: Date;
    end: Date;
  };

  const data: lessonType[] = responce.map((res) => ({
    title: res.name,
    allDay: false,
    start: new Date(res.startTime),
    end: new Date(res.endTime),
  }));
  return (
    <>
      <BigCalander data={data} />
    </>
  );
}

export default BigCalenderWraper;
