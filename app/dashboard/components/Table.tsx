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
    <table className="min-w-full border-collapse overflow-hidden rounded-md border-0 border-b-slate-700">
      <thead className="w-full rounded-full border-0">
        <tr className="w-full border-0 border-slate-800 bg-gray-900 text-[14px]">
          {tableHeader.map((header, index) => (
            <th
              key={index}
              className={`border-b border-gray-500 px-3 py-2 text-left last:text-center ${header.class}`}
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
