import Image from "next/image";
import React from "react";

type UserProps = {
  id: number;
  teacherId: string;
  name: string;
  email: string;
  photo: string;
  phone: string;
  subjects: string[];
  classes: string[];
  address: string;
};

function ListCard({ user }: { user: UserProps }) {
  return (
    <tr
      key={user.id}
      className="w-full h-full border border-b-slate-700 hover:bg-gray-700"
    >
      <td className=" flex flex-row justify-around  px-1 py-2 ">
        <Image
          src={user.photo}
          width={35}
          height={35}
          alt="Profile Photo"
          className=" object-cover rounded-full w-8 h-8"
        />
        <section className="flex justify-start flex-col items-start ml-2">
          <p className="text-sm">{user.name}</p>
          <span className="text-xs text-slate-700">{user.email}</span>
        </section>
      </td>
      <td className=" px-4 py-2 text-sm">{user.teacherId}</td>
      <td className=" px-4 py-2 text-sm ">
        {user.subjects.map((sub) => (
          <span key={sub}>{sub + " "}</span>
        ))}
      </td>
      <td className="  px-4 py-2 text-sm">
        {user.classes.map((clas) => (
          <span key={clas}>{clas + " "}</span>
        ))}
      </td>
      <td className="  px-4 py-2 text-sm">{user.address}</td>
      <td className="  px-4 py-2 text-sm">{user.phone}</td>
      <td className="  px-4 py-2 text-sm">
        <div className="flex justify-center items-center gap-1">
          <button className=" flex justify-center text-center text-yellow-400  items-center h-[16] w-[16] p-2 bg-slate-600 rounded-full">
            +
          </button>
          <button className="flex justify-center text-center text-yellow-400 h-[16] w-[16] p-2 items-center bg-teal-600 rounded-full">
            +
          </button>
        </div>
      </td>
    </tr>
  );
}

export default ListCard;
