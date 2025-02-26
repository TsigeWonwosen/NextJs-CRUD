import Image from "next/image";
import React from "react";
import { Mail, Map, MapPinHouse, Phone } from "lucide-react";
import { Teacher } from "@prisma/client";
import Link from "next/link";

function SingleUserInfo({ teacher }: { teacher: Teacher }) {
  return (
    <div className="flex h-[300px] w-full flex-col items-start justify-between gap-5 bg-gray-900 p-4 lg:flex-row">
      <div className="flex h-full w-full items-center justify-start gap-4 rounded-md border border-gray-400/20 bg-gray-900 p-4 md:justify-center">
        <Image
          src={teacher?.img ? teacher.img : "/avatar.png"}
          width={40}
          height={40}
          alt={teacher?.name}
          className="h-[80px] w-[80px] rounded-full object-cover object-center lg:h-[100px] lg:w-[100px]"
        />
        <div className="justify-left items-left flex flex-col text-left">
          <section className="mb-2 flex flex-col gap-1">
            <h4 className="font-semibold text-slate-300/90">
              {teacher.name + " " + teacher.surname}
            </h4>
            <h5 className="text-sm font-semibold text-slate-300/80">
              {teacher.bloodType}
            </h5>
          </section>

          <span className="flex items-center gap-3 text-sm">
            <Mail className="h-3 w-3" />
            <p>{teacher.email}</p>
          </span>
          <span className="flex items-center gap-2">
            <Phone className="h-3 w-3" />
            <p>{teacher.phone}</p>
          </span>
          <span className="flex items-center gap-2">
            <MapPinHouse className="h-3 w-3" />
            <p>{teacher.address}</p>
          </span>
        </div>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-md border border-slate-400 px-6 py-4 text-left">
        <Link href="/dashboard/teachers">
          <button className="btn w-[100px] rounded-md border border-green-400 px-2 py-1 text-white hover:border-white hover:text-green-500">
            Go Back
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SingleUserInfo;
