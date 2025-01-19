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
      className="w-full h-full border border-transparent rounded-sm even:bg-slate-900 hover:bg-gray-700"
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
      <td className=" px-4 py-2 text-sm ">{user.subjects.join(", ")}</td>
      <td className="  px-4 py-2 text-sm">{user.classes.join(", ")}</td>
      <td className="  px-4 py-2 text-sm">{user.address}</td>
      <td className="  px-4 py-2 text-sm">{user.phone}</td>
      <td className="  px-4 py-2 text-sm">
        <div className="flex justify-center items-center gap-1">
          <button className=" flex justify-center text-center  items-center w-7 h-7 p-1 bg-lime-950 rounded-full ">
            <Image
              src="/view.png"
              alt=""
              width={16}
              height={16}
              className="rounded-full bg-lime-500 object-cover"
            />
          </button>
          <button className="flex justify-center items-center w-7 h-7 p-1  bg-red-200 rounded-full">
            <Image
              src="/delete.png"
              alt=""
              width={16}
              height={16}
              className=" rounded-full bg-red-700 object-cover"
            />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default ListCard;
