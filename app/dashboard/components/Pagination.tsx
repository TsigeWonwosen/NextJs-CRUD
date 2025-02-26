"use client";
import React from "react";

const PER_PAGE = 10;

function Pagination({
  total,
  handleChange,
}: {
  total: number;
  handleChange: (page: number) => void;
}) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = Math.ceil(total / PER_PAGE);

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
    handleChange(currentPage + 1);
  };
  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
    handleChange(currentPage - 1);
  };
  return (
    <div className="mt-1 flex w-[98%] items-center justify-between rounded-md border border-slate-700 px-4 py-2">
      <button
        disabled={currentPage === 1}
        onClick={handlePrev}
        className="rounded-md bg-slate-600 px-2 py-1 font-semibold disabled:cursor-not-allowed disabled:opacity-50"
      >
        Priv
      </button>
      <div className="m-1 flex w-[50%] items-center justify-center gap-3 text-center">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          return (
            <button
              key={page}
              className={`rounded-md px-2 py-1 ${
                currentPage === page ? "bg-lime-700" : "bg-slate-600"
              } font-semibold`}
              onClick={() => {
                setCurrentPage(page);
                handleChange(page);
              }}
            >
              {page}
            </button>
          );
        })}
      </div>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="rounded-md bg-slate-600 px-2 py-1 font-semibold disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
