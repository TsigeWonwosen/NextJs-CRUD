import { wait } from "@/app/utils/wait";
import React from "react";

export default async function NotificationPage() {
  await wait(7000);

  return (
    <div className="w-full h-full min-w-full">
      <h4> NotificationPage</h4>
    </div>
  );
}
