"use client";

import React from "react";
import { signIn } from "next-auth/react"; // Import the signIn function
import { useRouter } from "next/navigation"; // Import the useRouter hook

export default function GithubSignIn() {
  const navigate = useRouter();

  const handleSignIn = async () => {
    try {
      await signIn("github");
    } catch (error) {
      console.error("GitHub Sign-In Failed:", error);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleSignIn}
        className=" w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4"
      >
        Login With GitHub
      </button>
    </>
  );
}
