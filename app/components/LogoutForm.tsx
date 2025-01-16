import React from "react";
import { signOut } from "next-auth/react";
import { revalidatePath } from "next/cache";
import styles from "./navBar/nav.module.css";

function LogoutForm({
  user,
}: {
  user: { username: string; image: string | undefined };
}) {
  const handleLogout = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await signOut();
    revalidatePath("/");
  };

  return (
    <form
      onSubmit={handleLogout}
      className="flex  flex-col justify-center items-start hover:text-gray-200 bg-slate-800 w-[200px] h-[80px] p-[10px] "
    >
      {
        <div className="flex text-start">
          <p className={`${styles.navButton} text-lime-500 capitalize w-full`}>
            {" "}
            {user?.username}
          </p>
        </div>
      }

      <button type="submit" className="navButton">
        Logout
      </button>
    </form>
  );
}

export default LogoutForm;
