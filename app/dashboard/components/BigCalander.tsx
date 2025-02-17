"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // Enables
import "@/app/dashboard/styles/Fullcalander.css";

import { calendarEvents } from "@/app/utils/data";
function BigCalander() {
  const events = [
    { title: "Meeting", date: "2025-02-22" },
    { title: "Conference", date: "2025-02-23" },
    { title: "Coffe Cermone", date: "2025-02-25" },
    { title: "C.d.c Lab Checkup", date: "2025-02-24" },
  ];

  return (
    <div className="px-6 py-2 w-full h-full mt-4 mb-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        events={events}
        weekends={false}
        slotMinTime="08:00:00" // Calendar start time
        slotMaxTime="18:00:00" // Calendar end time
        height="auto" // Make the calendar responsive
        eventColor="##1f1d5e" // Default event background color
        headerToolbar={{
          left: "prev,next today", // Add navigation buttons
          center: "title", // Show the calendar title
          right: "dayGridMonth,timeGridWeek,timeGridDay", // Add view buttons
        }}
        initialEvents={[
          { title: "nice event", start: new Date(), resourceId: "a" },
        ]}
      />
    </div>
  );
}

export default BigCalander;
