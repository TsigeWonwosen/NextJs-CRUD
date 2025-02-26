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
    <div className="mt-1 flex w-[98%] items-center justify-between rounded-md border border-slate-700 px-4 py-2">
      <button
        disabled={currentPage === 1}
        onClick={handlePrev}
        className="disabled:bg-gray-300font-semibold rounded-md bg-slate-400 px-2 py-0.5 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Priv
      </button>
      <div className="m-1 flex w-[50%] items-center justify-center gap-3 text-center">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`rounded-md px-2 py-0.5 ${
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
        className="rounded-md bg-slate-400 px-2 py-0.5 font-semibold disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

export default PaginationServerSide;
