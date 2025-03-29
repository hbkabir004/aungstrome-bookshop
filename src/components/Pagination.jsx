import React, { memo } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = memo(({ currentPage, totalPages, onPageChange }) => {
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    buttons.push(
      <button
        key="first"
        onClick={() => onPageChange(1)}
        className={`pagination-btn ${currentPage === 1 ? 'active' : ''}`}
        disabled={currentPage === 1}
      >
        1
      </button>
    );

    if (startPage > 2) {
      buttons.push(
        <span key="ellipsis-1" className="px-2">
          ...
        </span>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i === 1 || i === totalPages) continue;
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages - 1) {
      buttons.push(
        <span key="ellipsis-2" className="px-2">
          ...
        </span>
      );
    }

    if (totalPages > 1) {
      buttons.push(
        <button
          key="last"
          onClick={() => onPageChange(totalPages)}
          className={`pagination-btn ${currentPage === totalPages ? 'active' : ''}`}
          disabled={currentPage === totalPages}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="btn btn-primary p-2"
      >
        <FaChevronLeft />
      </button>

      <div className="flex gap-1">
        {renderPaginationButtons()}
      </div>

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="btn btn-primary p-2"
      >
        <FaChevronRight />
      </button>
    </div>
  );
});

Pagination.displayName = 'Pagination';

export default Pagination;