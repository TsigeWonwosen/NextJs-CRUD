import React from "react";

function ClassForm({
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
  return <div>ClassForm {title + " " + table}</div>;
}

export default ClassForm;
