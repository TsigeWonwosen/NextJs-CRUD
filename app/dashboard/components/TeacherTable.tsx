import React from "react";

import { teachersData } from "@/app/utils/data";
import ListCard from "./ListCard";

function TeacherTable() {
  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full border-collapse border border-b-slate-700">
        <thead>
          <tr className="bg-gray-600 text-sm">
            <th className="border border-gray-500 px-4 py-2 text-left">Info</th>
            <th className="border border-gray-500 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-500 px-4 py-2 text-left">
              Subjects
            </th>
            <th className="border border-gray-500 px-4 py-2 text-left">
              Class
            </th>
            <th className="border border-gray-500 px-4 py-2 text-left">
              Address
            </th>
            <th className="border border-gray-500 px-4 py-2 text-left">
              Phone
            </th>
            <th className="border border-gray-500 px-4 py-2 text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="border border-b-slate-700">
          {teachersData.map((teacher) => (
            <ListCard key={teacher.id} user={teacher} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeacherTable;
