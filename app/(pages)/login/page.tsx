import { getServerSession } from "next-auth";
import React from "react";
import { redirect } from "next/navigation";
import { Options } from "@/app/libs/auth";
import LoginForm from "@/app/components/LoginPage";

async function LoginPage() {
  const session = await getServerSession(Options);

  if (session) {
    redirect("/dashboard");
  }
  return <LoginForm />;
}

export default LoginPage;
