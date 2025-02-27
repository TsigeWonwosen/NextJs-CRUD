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
    <div className="flex w-full gap-x-4 p-7">
      <div className="w-1/2 items-center rounded-lg bg-slate-900 p-7">
        <h2 className="text-- mb-4 text-center text-2xl font-bold">
          List of Staffs
        </h2>
        {staffs.map((staff) => {
          return <StaffCard key={staff.email} staff={staff} />;
        })}
      </div>

      <AddUser handleLogin={() => {}} />
    </div>
  );
}

export default Admin;
