"use client";

import { X } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type RemoveButtonProps = {
  onClick: () => void;
  className?: string;
};

const RemoveButton = ({ onClick, className }: RemoveButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "absolute top-1 right-1 bg-white dark:bg-black rounded-full p-1 shadow cursor-pointer",
      className
    )}
  >
    <X className="w-4 h-4 text-red-500 hover:rotate-90 transition-transform duration-200" />
  </button>
);

export default RemoveButton;
