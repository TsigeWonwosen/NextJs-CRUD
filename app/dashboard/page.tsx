"use client";

import React from "react";
import Card from "../components/Card";

import dynamic from "next/dynamic";
const BigCalander = dynamic(() => import("./components/BigCalander"), {
  ssr: false,
  loading: () => <h1>Loading...</h1>,
});

const Calendar = dynamic(() => import("react-calendar"), {
  ssr: false,
  loading: () => <h1>Calander is Loading...</h1>,
});

const SchoolChart = dynamic(() => import("./components/SchoolChart"), {
  ssr: false,
  loading: () => <h1>Calander is Loading...</h1>,
});

import StatusChart from "./components/StatusChart";
import Annauncement from "./components/Annauncement";
import InfoCard from "./components/InfoCard";
import ReactCalandor from "./components/ReactCalandor";

export default function DashboardPage() {
  return (
    <div className="flex justify-between flex-col  md:flex-row  md:gap-4 w-full h-full   gap-2  relative ">
      <div className="flex flex-col justify-between h-full w-full gap-5">
        <div className="flex justify-between transition-all flex-col items-center md:flex-row gap-4 flex-wrap w-full h-full mb-5 md:mb-2">
          <InfoCard name="Teachers" total={+35} />
          <InfoCard name="Students" total={2400} />
          <InfoCard name="Parents" total={1399} />
          <InfoCard name="Staffs" total={22} />
        </div>
        <BigCalander />

        <SchoolChart />
      </div>
      <div className="flex mt-4 md:w-[350px] md:mt-0 h-full">
        <Card>
          <ReactCalandor />
          <Annauncement />
          <StatusChart />
        </Card>
      </div>
    </div>
  );
}
