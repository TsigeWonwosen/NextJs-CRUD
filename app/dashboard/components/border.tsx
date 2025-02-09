import React from "react";

function Border({ direction }: { direction: string }) {
  let border = "border" + "-" + direction;

  return (
    <section className={`${border} border-gray-700 border-opacity-50 mb-2`} />
  );
}

export default Border;
