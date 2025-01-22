import React from "react";
import { getStaffs } from "../libs/action";
import StaffCard from "./StaffCard";
import { StaffType } from "../libs/types";

const ListOfStaff = async () => {
  const staffs: StaffType[] = await getStaffs();

  return (
    <div className="flex flex-col items-center mx-auto">
      <h1 className="text-4xl font-bold text-center text-gray-700">
        Staffs Management
      </h1>
      {staffs.map((staff: StaffType) => {
        return <StaffCard key={staff._id} staff={staff} />;
      })}
    </div>
  );
};

export default ListOfStaff;
