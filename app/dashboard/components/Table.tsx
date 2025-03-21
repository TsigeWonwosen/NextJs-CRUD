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
    <table className="min-w-full overflow-hidden rounded-md py-2">
      <thead className="text-light-text-d dark:text-dark-text-d w-full rounded-full">
        <tr className="border-light-text-d w-full border-b-[0.2px] text-[13px] dark:border-slate-900">
          {tableHeader.map((header, index) => (
            <th
              key={index}
              className={`px-3 py-2 text-left last:text-center ${header.class}`}
            >
              {header.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="border-b border-y-gray-900">
        {data.map((item) => Lists(item))}
      </tbody>
    </table>
  );
}

export default Table;
