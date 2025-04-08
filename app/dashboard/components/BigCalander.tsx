"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // Enables
import "@/app/dashboard/styles/Fullcalander.css";

type lessonType = {
  title: string;
  allDay: boolean;
  start: Date;
  end: Date;
};

function BigCalander({ data }: { data: lessonType[] }) {
  return (
    <div className="px 2 mb-4 mt-4 h-auto w-full rounded-md bg-light-bgw p-6 dark:bg-dark-bg md:mt-8">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        events={data}
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
