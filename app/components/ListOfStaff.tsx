import React from "react";
import { getStaffs } from "../libs/action";
import StaffCard from "./StaffCard";
import { StaffType } from "../libs/types";

const ListOfStaff = async () => {
  const staffs: StaffType[] = await getStaffs();

  return (
    <div className="mx-auto flex flex-col items-center">
      <h1 className="text-center text-4xl font-bold text-gray-700">
        Staffs Management
      </h1>
      {staffs.map((staff: StaffType) => {
        return <StaffCard key={staff._id} staff={staff} />;
      })}
    </div>
  );
};

export default ListOfStaff;
