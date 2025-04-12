import Link from "next/link";
import React from "react";

function Settings() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <h2 className="text-lg font-semibold text-light-text dark:text-dark-text">
        Under constraction.
      </h2>
      <Link
        href="/dashboard/"
        className="rounded-md border-[1px] border-gray-300 px-2 py-[4px]"
      >
        Back to home
      </Link>
    </div>
  );
}

export default Settings;
