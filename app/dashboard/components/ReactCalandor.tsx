"use client";

import React, { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css"; // Import default styles
import "@/app/dashboard/styles/ReactCalander.css";
import { useRouter } from "next/navigation";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
function ReactCalandor() {
  const [value, onChange] = useState<Value>(new Date());
  const [calendarWidth, setCalendarWidth] = useState("100%");
  const parentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (value instanceof Date) {
      router.push(`?date=${value.toLocaleDateString("en-CA")}`);
    }
    const updateWidth = () => {
      if (parentRef.current) {
        const parentWidth = parentRef.current.offsetWidth;
        setCalendarWidth(`${parentWidth}px`);
      }
    };

    // Initial width update
    updateWidth();

    // Update width on window resize
    window.addEventListener("resize", updateWidth);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", updateWidth);
  }, [router, value]);

  return (
    <div style={{ width: calendarWidth, height: "auto" }}>
      <Calendar
        onChange={onChange}
        value={value}
        className="responsive-calendar"
      />
    </div>
  );
}

export default ReactCalandor;
