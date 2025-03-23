"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PER_PAGE } from "@/app/libs/constants";

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

  let numberOfLists = currentPage === 1 ? PER_PAGE : currentPage * PER_PAGE;
  let pageStart = currentPage === 1 ? 1 : (currentPage - 1) * PER_PAGE;

  return (
    <div className="mt-5 flex w-full flex-col items-center justify-center gap-1 rounded-md border-[0.5px] border-slate-700/10 px-4 py-2 dark:border-slate-700/20 sm:flex-row">
      <section className="mb-2 w-full text-center sm:mb-0 sm:text-left">
        <p>
          Showing {pageStart} to {numberOfLists} of {totalPages * PER_PAGE}{" "}
          entries
        </p>
      </section>
      <section className="justify-right flex h-full w-auto items-center gap-2 text-light-text dark:text-dark-text">
        <button
          disabled={currentPage === 1}
          onClick={handlePrev}
          className="flex h-full w-full items-center justify-center rounded-sm bg-light-button/10 px-2 py-1 font-semibold disabled:cursor-not-allowed disabled:bg-light-button/10"
        >
          <ArrowLeft size={"19px"} />
        </button>
        <div className="m-1 flex w-[50%] items-center justify-center gap-3 text-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`flex h-7 w-7 items-center justify-center rounded-sm px-2 py-2 ${
                currentPage === page
                  ? "bg-light-button text-white/80"
                  : "bg-light-button/10"
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
          className="flex h-full w-full items-center justify-center rounded-sm bg-light-button/10 px-2 py-1 font-semibold disabled:cursor-not-allowed disabled:bg-light-button/10"
        >
          <ArrowRight size={"18px"} />
        </button>
      </section>
    </div>
  );
}

export default PaginationServerSide;
