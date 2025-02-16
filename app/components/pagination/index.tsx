import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const generatePageNumbers = () => {
    const pageNumbers: (number | "...")[] = [];
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      pageNumbers.push(i);
    }
    if (currentPage - 2 > 4) {
      pageNumbers.push("...");
    }
    const start = Math.max(4, currentPage - 1);
    const end = Math.min(totalPages - 3, currentPage + 1);
    for (let i = start; i <= end; i++) {
      if (!pageNumbers.includes(i)) {
        pageNumbers.push(i);
      }
    }
    if (currentPage + 2 < totalPages - 3) {
      pageNumbers.push("...");
    }
    for (let i = Math.max(totalPages - 2, 4); i <= totalPages; i++) {
      if (!pageNumbers.includes(i)) {
        pageNumbers.push(i);
      }
    }
    return pageNumbers;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number | "...") => {
    if (page !== "..." && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded font-semibold text-black border border-red-600 ${
          currentPage === 1
            ? " cursor-not-allowed"
            : " hover:bg-red-600 transition-all duration-200 "
        }`}
      >
        Previous
      </button>

      {generatePageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(page)}
          className={`px-4 py-2 border border-red-500 rounded ${
            page === currentPage
              ? "bg-red-500 text-black"
              : page === "..."
              ? "text-gray-500 cursor-default"
              : " hover:bg-red-500"
          }`}
          disabled={page === "..."}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded font-semibold text-black border border-red-600 ${
          currentPage === totalPages
            ? " cursor-not-allowed"
            : " hover:bg-red-600 transition-all duration-200 "
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
