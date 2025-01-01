import React from "react";
import { getStaffs } from "../libs/action";
import StaffCard from "./StaffCard";

const ListOfStaff = async () => {
  const staffs = await getStaffs();

  return (
    <>
      <h1 className="text-4xl font-bold text-center text-gray-700">
        Staffs Management
      </h1>
      {staffs.map((staff) => {
        return <StaffCard key={staff._id} staff={staff} />;
      })}
    </>
  );
};

export default ListOfStaff;
