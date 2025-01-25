"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // Enables drag and drop
// import "@fullcalendar/common/main.css";
// import "@fullcalendar/daygrid/main.css";
import "@/app/dashboard/styles/Fullcalander.css";

import { calendarEvents } from "@/app/utils/data";
function BigCalander() {
  const events = [
    { title: "Meeting", date: "2025-01-22" },
    { title: "Conference", date: "2025-01-23" },
    { title: "Coffe Cermone", date: "2025-01-25" },
    { title: "C.d.c Lab Checkup", date: "2025-01-24" },
  ];

  return (
    <div className="px-6 py-2 w-full h-full mt-4 mb-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        events={calendarEvents}
        headerToolbar={{
          left: "prev,next today", // Add navigation buttons
          center: "title", // Show the calendar title
          right: "dayGridMonth,timeGridWeek,timeGridDay", // Add view buttons
        }}
      />
    </div>
  );
}

export default BigCalander;
