"use client";

import { cn } from "@/shared/utils/cn";
import Button from "./Button";

export default function Pagination({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  className,
}) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = totalItems > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const showMax = 5;

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + showMax - 1);

    if (end - start + 1 < showMax) {
      start = Math.max(1, end - showMax + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center justify-between gap-3 py-3 px-1",
        className
      )}
    >
      {totalItems > 0 && (
        <div className="text-xs text-text-muted">
          <span className="text-text-main font-medium">{startItem}</span>–<span className="text-text-main font-medium">{endItem}</span> of <span className="text-text-main font-medium">{totalItems}</span>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {onPageSizeChange && (
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-text-muted">Rows:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className={cn(
                "min-h-9 rounded-xl border border-border bg-surface/75 px-3 shadow-sm backdrop-blur-xl",
                "text-xs font-medium text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20",
                "cursor-pointer"
              )}
              style={{ colorScheme: 'auto' }}
            >
              {[10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center gap-0.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="min-w-9 min-h-9 px-0 rounded-full"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </Button>

            {pageNumbers[0] > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onPageChange(1)}
                  className="min-w-9 min-h-9 px-0 rounded-full hidden sm:inline-flex"
                >
                  1
                </Button>
                {pageNumbers[0] > 2 && (
                  <span className="text-text-muted px-0.5 hidden sm:inline">···</span>
                )}
              </>
            )}

            {pageNumbers.map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "primary" : "ghost"}
                size="sm"
                onClick={() => onPageChange(page)}
                className={cn(
                  "min-w-9 min-h-9 px-0 rounded-full",
                  currentPage === page ? "inline-flex" : "hidden sm:inline-flex"
                )}
              >
                {page}
              </Button>
            ))}

            {pageNumbers[pageNumbers.length - 1] < totalPages && (
              <>
                {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                  <span className="text-text-muted px-0.5 hidden sm:inline">···</span>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onPageChange(totalPages)}
                  className="min-w-9 min-h-9 px-0 rounded-full hidden sm:inline-flex"
                >
                  {totalPages}
                </Button>
              </>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="min-w-9 min-h-9 px-0 rounded-full"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
