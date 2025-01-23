"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
// import "@fullcalendar/common/main.css";
// import "@fullcalendar/daygrid/main.css";

import { calendarEvents } from "@/app/utils/data";
function BigCalander() {
  const events = [
    { title: "Meeting", date: "2025-01-22" },
    { title: "Conference", date: "2025-01-23" },
    { title: "Coffe Cermone", date: "2025-01-25" },
    { title: "C.d.c Lab Checkup", date: "2025-01-24" },
  ];

  return (
    <div className="px-6 py-2 w-full h-full">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
      />
    </div>
  );
}

export default BigCalander;
