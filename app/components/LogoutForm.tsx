import React from "react";
import { signOut } from "next-auth/react";
import { revalidatePath } from "next/cache";
import styles from "./navBar/nav.module.css";

function LogoutForm({ user }: { user: { name: string } }) {
  const handleLogout = async (even: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await signOut();
    revalidatePath("/");
  };

  return (
    <form onSubmit={handleLogout} className="flex center hover:text-gray-200">
      {<p className={`${styles.navButton} text-lime-500`}> {user?.name}</p>}
      <span className="px-2">|</span>
      <button type="submit" className="navButton">
        Logout
      </button>
    </form>
  );
}

export default LogoutForm;
