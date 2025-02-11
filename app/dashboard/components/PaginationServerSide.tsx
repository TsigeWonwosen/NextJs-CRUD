"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

function PaginationServerSide({ totalPages }: { totalPages: number }) {
  const [currentPage, setCurrentPage] = React.useState(1);

  const path = usePathname();
  const router = useRouter();

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
    if (currentPage === totalPages) {
      router.push(`${path}?page=${1}`);
    } else {
      router.push(`${path}?page=${currentPage + 1}`);
    }
  };
  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
    if (currentPage === 1) {
      router.push(`${path}?page=${1}`);
    } else {
      router.push(`${path}?page=${currentPage - 1}`);
    }
  };
  const handlePagination = (page: number) => {
    router.push(`${path}?page=${page}`);
    setCurrentPage(page);
  };

  if (totalPages <= 1) return;
  return (
    <div className="flex justify-between items-center px-4 py-2 mt-1 w-[98%] border border-slate-700 rounded-md">
      <button
        disabled={currentPage === 1}
        onClick={handlePrev}
        className=" rounded-md px-2 py-0.5  bg-slate-400 disabled:bg-gray-300font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Priv
      </button>
      <div className="flex justify-center items-center  text-center w-[50%]  gap-3 m-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`px-2 py-0.5  rounded-md ${
              currentPage === page ? "bg-lime-700" : "bg-slate-600"
            } font-semibold`}
            onClick={() => {
              handlePagination(page);
            }}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className=" rounded-md px-2 py-0.5  bg-slate-400 disabled:bg-gray-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}

export default PaginationServerSide;
