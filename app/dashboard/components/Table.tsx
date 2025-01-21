import React from "react";

function Table({
  data,
  tableHeader,
  Lists,
}: {
  data: any[];
  tableHeader: any[];
  Lists: (item: any) => React.ReactNode;
}) {
  return (
    <table className="min-w-full border-collapse border-0 border-b-slate-700 rounded-full">
      <thead className="rounded-full border-0 w-full">
        <tr className="bg-slate-700 text-sm  border-0 border-slate-800 w-full">
          {tableHeader.map((header, index) => (
            <th
              key={index}
              className={`border-b border-gray-500 px-4 py-2 text-left  ${header.class}`}
            >
              {header.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="border-b border-y-gray-900">
        {data.map((teacher) => Lists(teacher))}
      </tbody>
    </table>
  );
}

export default Table;
