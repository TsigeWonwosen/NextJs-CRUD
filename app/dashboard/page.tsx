import React from "react";
import Card from "../components/Card";

import dynamic from "next/dynamic";
const BigCalenderWraper = dynamic(
  () => import("./components/BigCalenderWraper"),
  {
    loading: () => <h1>Loading...</h1>,
  },
);

const SchoolChart = dynamic(() => import("./components/SchoolChart"), {
  loading: () => <h1>SchoolChart is Loading...</h1>,
});

import Annauncement from "./components/Annauncement";
import ReactCalandor from "./components/ReactCalandor";
import StatusChartwrapper from "./components/StatusChartwrapper";
import EventList from "./components/EventList";
import InfoCardsWrapper from "./components/InfoCardsWrapper";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { date } = await searchParams;

  return (
    <div className="relative flex h-full w-full flex-col justify-between gap-2 md:flex-row md:gap-4">
      <div className="flex h-full w-full flex-col items-center justify-between gap-5">
        <InfoCardsWrapper />
        <BigCalenderWraper />
        <SchoolChart />
      </div>
      <div className="mt-4 flex h-full w-full md:mt-0 md:w-[300px]">
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
