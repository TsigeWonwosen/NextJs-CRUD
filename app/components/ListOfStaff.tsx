import React from "react";
import { getStaffs } from "../libs/action";
import StaffCard from "./StaffCard";

type Staff = {
  _id: string;
  username: string;
  email: string;
  role: string;
};
const ListOfStaff = async () => {
  const staffs: Staff[] | any = await getStaffs();

  return (
    <>
      <h1 className="text-4xl font-bold text-center text-gray-700">
        Staffs Management
      </h1>
      {staffs.map((staff: Staff) => {
        return <StaffCard key={staff._id} staff={staff} />;
      })}
    </>
  );
};

export default ListOfStaff;
