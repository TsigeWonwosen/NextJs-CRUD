"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
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

const data = [
  {
    name: "Seb",
    Income: 4000,
    expence: 2400,
  },
  {
    name: "Oct",
    Income: 23000,
    expence: 7400,
  },
  {
    name: "Nov",
    Income: 2800,
    expence: 20000,
  },
  {
    name: "Dec",
    Income: 13000,
    expence: 1300,
  },
  {
    name: "Jan",
    Income: 2100,
    expence: 2000,
  },
  {
    name: "Feb",
    Income: 7990,
    expence: 400,
  },
  {
    name: "Mar",
    Income: 8380,
    expence: 2400,
  },
  {
    name: "Apr",
    Income: 1200,
    expence: 2400,
  },
  {
    name: "May",
    Income: 4000,
    expence: 131,
  },
  {
    name: "Jun",
    Income: 3300,
    expence: 2300,
  },
  {
    name: "Jul",
    Income: 1300,
    expence: 300,
  },
  {
    name: "Aug",
    Income: 1990,
    expence: 2200,
  },
];

function SchoolChart() {
  return (
    <div className="bg-light-bgw dark:bg-dark-bg mb-4 mt-4 h-[400px] w-[95%] rounded-md p-6">
      <section className="mb-2 flex h-[30px] items-center justify-between">
        <h3 className="text-xl font-semibold">Finance</h3>
        <Link href={`#`}>
          <Image
            src="/more.png"
            alt="More"
            width={13}
            height={13}
            className="hover:cursor-pointer"
          />
        </Link>
      </section>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 3,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="name" height={60} />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0F172B",
              borderColor: "#777",
              borderWidth: "0.2px",
              color: "#636973",
              borderRadius: "5px",
              marginBottom: "5px",
            }}
            itemStyle={{
              color: "#82ca9d",
              textAlign: "left",
              fontSize: "12px",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="Income"
            stroke="#3788D8"
            label="Total Men"
          />
          <Line type="monotone" dataKey="expence" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SchoolChart;
