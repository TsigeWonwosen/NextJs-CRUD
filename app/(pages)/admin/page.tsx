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
    <div className="flex w-full flex-col-reverse items-center gap-5 p-7 md:flex-row md:items-start md:justify-around">
      <div className="w-full items-center rounded-lg bg-slate-900 p-7 md:w-1/2">
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
