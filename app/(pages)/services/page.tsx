import ListOfStaff from "@/app/components/ListOfStaff";
import { Options } from "@/app/libs/auth";
import { prisma } from "@/app/libs/prisma";
import { getServerSession } from "next-auth";

async function Services() {
  const session = await getServerSession(Options);

  const teachers = await prisma.class.findMany({
    take: 5,
    orderBy: { capacity: "desc" },
  });
  console.log("first 5 teachers", teachers);

  return (
    <>
      <ListOfStaff />
    </>
  );
}

export default Services;
