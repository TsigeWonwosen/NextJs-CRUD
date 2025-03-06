import React from "react";

function Border({ direction }: { direction: string }) {
  let border = "border" + "-" + direction;

  return (
    <section className={`${border} mb-1 border-gray-700 border-opacity-50`} />
  );
}

export default Border;
