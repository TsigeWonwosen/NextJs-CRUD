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
    <div className="flex justify-between flex-col  md:flex-row  md:gap-4 w-full h-full   gap-2  relative ">
      <div className="flex flex-col justify-between h-full w-full gap-5">
        <div className="flex justify-between transition-all flex-col items-center md:flex-row gap-4 flex-wrap w-full h-full mb-5 md:mb-2">
          <InfoCard name="admin" />
          <InfoCard name="teacher" />
          <InfoCard name="student" />
          <InfoCard name="parent" />
        </div>
        <BigCalenderWraper />

        <SchoolChart />
      </div>
      <div className="flex mt-4 md:w-[350px] md:mt-0 h-full">
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
