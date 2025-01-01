import ListOfStaff from "@/app/components/ListOfStaff";
import { Options } from "@/app/libs/auth";
import { getServerSession } from "next-auth";

async function Services() {
  const session = await getServerSession(Options);

  return (
    <>
      <ListOfStaff />
    </>
  );
}

export default Services;
