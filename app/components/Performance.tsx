import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Mon",
    uv: 10,
  },
  {
    name: "Tue",
    uv: 9,
  },
  {
    name: "Wed",
    uv: 3,
  },
  {
    name: "Thu",
    uv: 2,
  },
  {
    name: "Fri",
    uv: 10,
  },
];
function Performance() {
  return (
    <div className="mt-2 flex h-full max-h-[600px] w-full flex-col items-center justify-center sm:max-h-[300px]">
      <ResponsiveContainer className="-ml-4" width="100%" height={200}>
        <BarChart width={400} height={200} data={data}>
          <Bar
            dataKey="uv"
            fill="#3b82d2"
            barSize={18} // Set width of the bar here
            radius={[8, 8, 0, 0]} // Rounded top corners
          />
          <XAxis
            dataKey="name"
            className="text-light-text dark:text-[d4d4d8]"
          />
          <YAxis className="hidden text-light-text dark:text-[d4d4d8] lg:block" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Performance;
