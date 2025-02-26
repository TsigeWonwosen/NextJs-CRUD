"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const COLORS = ["#06093C", "#3788D8", "#141720", "#98A0AE"];

type dataType = {
  name: string;
  value: number;
};

export default function StatusChart({ data }: { data: dataType[] }) {
  return (
    <div className="flex h-[400px] w-full flex-col justify-between rounded-md bg-[#0C162E] px-2 py-4 md:w-[95%] md:px-5">
      <section className="flex h-[30px] items-center justify-between">
        <h3 className="text-xl font-semibold">Students</h3>
        <Link href={`/dashboard/students`}>
          <Image
            src="/more.png"
            alt="More"
            width={13}
            height={13}
            className="hover:cursor-pointer"
          />
        </Link>
      </section>
      <ResponsiveContainer width="100%" height="100%" className="h-full w-full">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="flex w-full items-center justify-center gap-5">
        <section className="flex items-center justify-center gap-2">
          <span className="h-[12px] w-[12px] rounded-full bg-[#3788D8]"></span>
          <p className="text-[13px] font-semibold text-gray-200">Boys</p>
        </section>
        <section className="flex items-center justify-center gap-2">
          <span className="h-[12px] w-[12px] rounded-full bg-[#06093C]"></span>
          <p className="text-[13px] font-semibold text-gray-200">Gilrs</p>
        </section>
      </div>
    </div>
  );
}
