"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

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

  const router = useRouter();
  useEffect(() => {
    router.push(`?page=${currentPage}`, { scroll: false });
  }, [currentPage]);

  let numberOfLists = currentPage === 1 ? PER_PAGE : currentPage * PER_PAGE;
  let pageStart = currentPage === 1 ? 1 : (currentPage - 1) * PER_PAGE;

  return (
    <div className="mt-5 flex w-full flex-col items-center justify-center gap-1 rounded-md border-[0.5px] border-slate-700/10 px-4 py-2 dark:border-slate-700/20 sm:flex-row">
      <section className="mb-2 w-full text-center sm:mb-0 sm:text-left">
        <p>
          {pageStart} - {numberOfLists} of {totalPages * PER_PAGE} entries
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
        <div className="m-1 flex w-full items-center justify-center gap-3 text-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            return (
              <button
                key={page}
                className={`rounded-md px-2 py-1 ${
                  currentPage === page
                    ? "bg-light-button text-white/80"
                    : "bg-light-button/10"
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
          className="flex h-full w-full items-center justify-center rounded-sm bg-light-button/10 px-2 py-1 font-semibold disabled:cursor-not-allowed disabled:bg-light-button/10"
        >
          <ArrowRight size={"18px"} />
        </button>
      </section>
    </div>
  );
}

export default Pagination;
