"use client";

import React from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import Card from "../components/Card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import dynamic from "next/dynamic";
const BigCalander = dynamic(() => import("./components/BigCalander"), {
  ssr: false,
  loading: () => <h1>Loading...</h1>,
});
import StatusChart from "./components/StatusChart";
import Annauncement from "./components/Annauncement";

export default function DashboardPage() {
  type ValuePiece = Date | null;

  type Value = ValuePiece | [ValuePiece, ValuePiece];
  const [value, onChange] = useState<Value>(new Date());

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <div className="flex justify-between flex-row w-full h-full  gap-2  relative">
      <div className="flex flex-col justify-between h-full w-full gap-5">
        <BigCalander />
        <div className="w-full h-[400px] ">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis dataKey="name" height={60} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" label="" />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              <Line type="monotone" dataKey="amt" stroke="#FFFFFF" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex w-[350px] h-full mt-3">
        <Card>
          <Calendar onChange={onChange} value={value} />
          <Annauncement />
          <StatusChart />
        </Card>
      </div>
    </div>
  );
}
