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
    <div className=" w-full md:w-[95%] h-[400px]  bg-[#0C162E] rounded-md flex flex-col justify-between px-2 py-4 md:px-5">
      <section className="h-[30px] flex justify-between items-center">
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
      <div className="w-full flex justify-center items-center gap-5">
        <section className="flex  justify-center items-center gap-2">
          <span className="w-[12px] h-[12px] rounded-full bg-[#3788D8]"></span>
          <p className="font-semibold text-[13px] text-gray-200">Boys</p>
        </section>
        <section className="flex  justify-center items-center gap-2">
          <span className="w-[12px] h-[12px] rounded-full bg-[#06093C]"></span>
          <p className="font-semibold text-[13px] text-gray-200">Gilrs</p>
        </section>
      </div>
    </div>
  );
}
