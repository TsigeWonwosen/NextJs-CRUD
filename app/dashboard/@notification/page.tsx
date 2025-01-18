import { wait } from "@/app/utils/wait";
import React from "react";
import TeacherTable from "../components/TeacherTable";

export default async function NotificationPage() {
  await wait(7000);

  return (
    <div className="w-full h-full">
      <TeacherTable />
    </div>
  );
}
