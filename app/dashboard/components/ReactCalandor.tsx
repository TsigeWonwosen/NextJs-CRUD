"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css"; // Import default styles
import "@/app/dashboard/styles/ReactCalander.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
function ReactCalandor() {
  const [value, onChange] = useState<Value>(new Date());

  return <Calendar onChange={onChange} value={value} />;
}

export default ReactCalandor;
