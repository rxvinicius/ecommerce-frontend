"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type PaginationProps = {
  page: number;
  lastPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  page,
  lastPage,
  onPageChange,
}: PaginationProps) {
  const isFirst = page === 1;
  const isLast = page === lastPage || lastPage === 0;

  const goToPrevious = () => {
    if (!isFirst) onPageChange(page - 1);
  };

  const goToNext = () => {
    if (!isLast) onPageChange(page + 1);
  };

  return (
    <div className={`flex items-center justify-center gap-4`}>
      <Button
        onClick={goToPrevious}
        disabled={isFirst}
        variant="outline"
        size="icon"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <span className="text-sm text-muted-foreground">
        Página <strong>{page}</strong> de <strong>{lastPage || 1}</strong>
      </span>

      <Button
        onClick={goToNext}
        disabled={isLast}
        variant="outline"
        size="icon"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
}
