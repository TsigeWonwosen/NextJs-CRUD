import Image from "next/image";
import Link from "next/link";
import { TeacherProps } from "@/app/libs/types";
import FormContainer from "./FormContainer";

function TeachersList(user: TeacherProps) {
  return (
    <tr
      key={user.id}
      className="h-full w-full rounded-sm border border-transparent"
    >
      <td className="justify-star flex flex-row">
        <div className="dark:bg-dark-bg-b flex h-7 w-7 items-center justify-center rounded-md bg-cyan-800/20">
          <Image
            src={user.img || "/profile.png"}
            width={30}
            height={30}
            alt="Profile Photo"
            className="h-6 w-6 rounded-md object-cover object-center"
          />
        </div>
        <section className="ml-[6px] flex flex-col items-start justify-start sm:ml-2 md:ml-3">
          <p className="text-sm">{user.name}</p>
          <span className="text-xs text-slate-700">{user.email}</span>
        </section>
      </td>
      <td className="hidden px-4 py-2 text-sm md:table-cell">{user.id}</td>
      <td className="hidden px-4 py-2 text-sm sm:table-cell">
        {user.subjects.map((sub) => sub?.name).join(", ")}
      </td>
      <td className="hidden px-4 py-2 text-sm md:table-cell">
        {user.classes.map((cla) => cla.name).join(", ") || "-"}
      </td>
      <td className="hidden px-4 py-2 text-sm md:table-cell">{user.address}</td>
      <td className="hidden px-4 py-2 text-sm md:table-cell">{user.phone}</td>
      <td className="px-4 py-2 text-sm">
        <div className="flex items-center justify-center gap-1">
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
