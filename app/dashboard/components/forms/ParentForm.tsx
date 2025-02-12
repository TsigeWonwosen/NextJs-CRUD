import React from "react";

function ParentFom({
  handleToggle,
  title,
  table,
  data,
  id,
}: {
  handleToggle: () => void;
  title: string;
  table: string;
  data?: any;
  id?: string;
}) {
  return <div>{table + " : " + title}</div>;
}

export default ParentFom;
