import React from "react";

function Border({ direction }: { direction: string }) {
  let border = "border" + "-" + direction;

  return (
    <section
      className={`${border} mb-1 w-[80%] border-["0.2px"] border-gray-300 border-opacity-50 dark:border-gray-900`}
    />
  );
}

export default Border;
