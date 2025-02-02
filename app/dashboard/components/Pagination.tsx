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
    <div className="flex justify-between items-center px-4 py-2 mt-1 w-[98%] border border-slate-700 rounded-md">
      <button
        disabled={currentPage === 1}
        onClick={handlePrev}
        className=" rounded-md px-2 py-1  bg-slate-600 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Priv
      </button>
      <div className="flex justify-center items-center  text-center w-[50%]  gap-3 m-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          return (
            <button
              key={page}
              className={`px-2 py-1  rounded-md ${
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
        className=" rounded-md px-2 py-1  bg-slate-600 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
