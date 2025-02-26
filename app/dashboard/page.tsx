import React from "react";
import Card from "../components/Card";

import dynamic from "next/dynamic";
const BigCalander = dynamic(() => import("./components/BigCalander"), {
  loading: () => <h1>Loading...</h1>,
});

const SchoolChart = dynamic(() => import("./components/SchoolChart"), {
  loading: () => <h1>Calander is Loading...</h1>,
});

import Annauncement from "./components/Annauncement";
import InfoCard from "./components/InfoCard";
import ReactCalandor from "./components/ReactCalandor";
import StatusChartwrapper from "./components/StatusChartwrapper";
import EventList from "./components/EventList";
import BigCalenderWraper from "./components/BigCalenderWraper";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { date } = await searchParams;
  return (
    <div className="relative flex h-full w-full flex-col justify-between gap-2 md:flex-row md:gap-4">
      <div className="flex h-full w-full flex-col justify-between gap-5">
        <div className="mb-5 flex h-full w-full flex-col flex-wrap items-center justify-between gap-4 transition-all md:mb-2 md:flex-row">
          <InfoCard name="admin" />
          <InfoCard name="teacher" />
          <InfoCard name="student" />
          <InfoCard name="parent" />
        </div>
        <BigCalenderWraper />

        <SchoolChart />
      </div>
      <div className="mt-4 flex h-full md:mt-0 md:w-[350px]">
        <Card>
          <ReactCalandor />
          <EventList dateParam={date} />
          <Annauncement searchParams={date} />
          <StatusChartwrapper />
        </Card>
      </div>
    </div>
  );
}
