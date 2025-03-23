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
    <table className="min-w-full overflow-hidden rounded-md py-4">
      <thead className="w-full rounded-full text-gray-400 dark:text-gray-700">
        <tr className="w-full border-b-[0.2px] border-gray-200 text-gray-400 dark:border-gray-950 dark:text-gray-600">
          {tableHeader.map((header, index) => (
            <th
              key={index}
              className={`pb-4 text-left text-[10px] first:px-4 first:text-left last:text-center ${header.class}`}
            >
              {header.header.toUpperCase()}
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
