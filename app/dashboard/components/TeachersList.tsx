import Image from "next/image";
import Link from "next/link";
import { TeacherProps } from "@/app/libs/types";
import FormContainer from "./FormContainer";

function TeachersList(user: TeacherProps) {
  return (
    <tr
      key={user.id}
      className="w-full h-full border border-transparent rounded-sm even:bg-slate-900 hover:bg-gray-700"
    >
      <td className=" flex flex-row justify-start  px-1 py-2 ">
        <Image
          src={user.img || "/profile.png"}
          width={30}
          height={30}
          alt="Profile Photo"
          className=" object-cover object-center rounded-full w-8 h-8"
        />
        <section className="flex justify-start flex-col items-start ml-[6px] sm:ml-2 md:ml-3 ">
          <p className="text-sm">{user.name}</p>
          <span className="text-xs text-slate-700">{user.email}</span>
        </section>
      </td>
      <td className=" px-4 py-2 text-sm hidden md:table-cell">{user.id}</td>
      <td className=" px-4 py-2 text-sm hidden sm:table-cell">
        {user.subjects.map((sub) => sub?.name).join(", ")}
      </td>
      <td className="  px-4 py-2 text-sm hidden md:table-cell">
        {user.classes.map((cla) => cla.name).join(", ") || "-"}
      </td>
      <td className="  px-4 py-2 text-sm hidden md:table-cell">
        {user.address}
      </td>
      <td className="  px-4 py-2 text-sm hidden md:table-cell">{user.phone}</td>
      <td className="  px-4 py-2 text-sm">
        <div className="flex justify-center items-center gap-1">
          <Link href={`/dashboard/teachers/${user.id}`}></Link>
          <FormContainer
            table="teacher"
            type="update"
            id={user.id}
            data={user}
          />
          <FormContainer table="teacher" type="delete" id={user.id} />
        </div>
      </td>
    </tr>
  );
}

export default TeachersList;
