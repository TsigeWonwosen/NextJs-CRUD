"use client";

import React from "react";
import { useState } from "react";
import Card from "../components/Card";
import "react-calendar/dist/Calendar.css"; // Import default styles

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
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function DashboardPage() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="flex justify-between flex-col  md:flex-row  md:gap-4 w-full h-full   gap-2  relative ">
      <div className="flex flex-col justify-between h-full w-full gap-5">
        <div className="flex justify-between transition-all flex-col items-center md:flex-row gap-3 flex-wrap w-full h-full ">
          <InfoCard name="Teachers" total={+35} />
          <InfoCard name="Students" total={2400} />
          <InfoCard name="Parents" total={1399} />
          <InfoCard name="Staffs" total={22} />
        </div>
        <BigCalander />

        <SchoolChart />
      </div>
      <div className="flex w-[350px] h-full">
        <Card>
          <Calendar onChange={onChange} value={value} />
          <Annauncement />
          <StatusChart />
        </Card>
      </div>
    </div>
  );
}
