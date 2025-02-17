import React from "react";
import StatusChart from "./StatusChart";
import { prisma } from "@/app/libs/prisma";

async function StatusChartwrapper() {
  const [{ _count: Mane }, { _count: Female }] = await prisma.student.groupBy({
    by: ["sex"],
    _count: true,
  });
  const students = await prisma.student.groupBy({
    by: ["sex"],
    _count: true,
    _avg: { gradeId: true },
    _min: { gradeId: true },
    _max: { gradeId: true },
  });

  const data = [
    { name: "Boys", value: Mane },
    { name: "Girls", value: Female },
    { name: "Total", value: Mane + Female },
  ];
  return <StatusChart data={data} />;
}

export default StatusChartwrapper;
