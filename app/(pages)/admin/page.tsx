"use client";
import React, { useEffect, useState } from "react";

import { getStaffs } from "@/app/libs/action";
import StaffCard from "@/app/components/StaffCard";
import { StaffType } from "@/app/libs/types";
import AddUser from "@/app/components/AddUser";

function Admin() {
  const [staffs, setStaffs] = useState<StaffType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data: StaffType | any = await getStaffs();

      setStaffs(data);
    };
    getData();
  }, []);

  return (
    <div className="flex gap-x-4 w-full p-7">
      <div className="w-1/2 bg-slate-900 rounded-lg p-7 items-center">
        <h2 className="text-2xl font-bold mb-4 text-center text--">
          List of Staffs
        </h2>
        {staffs.map((staff) => {
          return <StaffCard key={staff.email} staff={staff} />;
        })}
      </div>
      <AddUser />
    </div>
  );
}

export default Admin;
