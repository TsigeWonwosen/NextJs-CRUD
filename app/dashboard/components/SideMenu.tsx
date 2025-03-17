import React from "react";

import { Options } from "@/app/libs/auth";
import { getServerSession } from "next-auth";

import SideMunuClient from "@/app/components/SideMunuClient";

async function SideMenu() {
  const session = await getServerSession(Options);
  const role = session?.user.role ? session?.user.role : "Admin";
  const email = session?.user.email;

  if (role) {
    return <SideMunuClient role={role} email={email ? email : ""} />;
  }
}

export default SideMenu;
