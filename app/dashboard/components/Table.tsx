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
    <table className="min-w-full border-collapse border-0 border-b-slate-700 rounded-md overflow-hidden">
      <thead className="rounded-full border-0 w-full">
        <tr className="bg-gray-900 text-[14px]  border-0 border-slate-800 w-full">
          {tableHeader.map((header, index) => (
            <th
              key={index}
              className={`border-b border-gray-500 px-3 py-2 text-left  last:text-center  ${header.class}`}
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
