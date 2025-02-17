"use client";

import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css"; // Import default styles
import "@/app/dashboard/styles/ReactCalander.css";
import { useRouter } from "next/navigation";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
function ReactCalandor() {
  const [value, onChange] = useState<Value>(new Date());
  const router = useRouter();

  useEffect(() => {
    if (value instanceof Date) {
      router.push(`?date=${value.toLocaleDateString("en-CA")}`);
    }
  }, [router, value]);

  return <Calendar onChange={onChange} value={value} />;
}

export default ReactCalandor;
