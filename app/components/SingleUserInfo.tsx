import Image from "next/image";
import React from "react";
import { Mail, Map, MapPinHouse, Phone } from "lucide-react";
import { Teacher } from "@prisma/client";
import Link from "next/link";

function SingleUserInfo({ teacher }: { teacher: Teacher }) {
  return (
    <div className="flex flex-col justify-between items-start gap-5 w-full h-[300px] bg-gray-900 p-4  lg:flex-row">
      <div className="flex justify-start md:justify-center  items-center gap-4 rounded-md border border-gray-400/20 bg-gray-900 p-4 w-full h-full">
        <Image
          src={teacher?.img ? teacher.img : "/avatar.png"}
          width={40}
          height={40}
          alt={teacher?.name}
          className="object-cover object-center rounded-full  h-[80px] w-[80px] lg:w-[100px] lg:h-[100px]"
        />
        <div className="flex justify-left flex-col items-left  text-left">
          <section className="flex flex-col gap-1 mb-2 ">
            <h4 className="text-slate-300/90 font-semibold">
              {teacher.name + " " + teacher.surname}
            </h4>
            <h5 className="text-slate-300/80 font-semibold text-sm">
              {teacher.bloodType}
            </h5>
          </section>

          <span className="flex items-center gap-3 text-sm">
            <Mail className="w-3 h-3 " />
            <p>{teacher.email}</p>
          </span>
          <span className="flex items-center gap-2">
            <Phone className="w-3 h-3" />
            <p>{teacher.phone}</p>
          </span>
          <span className="flex items-center gap-2">
            <MapPinHouse className="w-3 h-3" />
            <p>{teacher.address}</p>
          </span>
        </div>
      </div>
      <div className="flex justify-center flex-col items-center text-left h-full w-full gap-4 px-6 py-4 border border-slate-400 rounded-md">
        <Link href="/dashboard/teachers">
          <button
            className="btn rounded-md border border-green-400 w-[100px] px-2 py-1 hover:text-green-500 hover:border-white
            text-white "
          >
            Go Back
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SingleUserInfo;
