"use client";
import LogoutForm from "@/app/components/LogoutForm";
import { useSession } from "next-auth/react";

function Logout() {
  const { data: session } = useSession();
  const { user } = session || {};

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h2 className="mb-2">Are sure, you want Logout?</h2>
      <LogoutForm
        user={
          user
            ? { username: user.username, image: user.image, email: user.email }
            : { username: "", image: undefined, email: undefined }
        }
      />
    </div>
  );
}

export default Logout;
