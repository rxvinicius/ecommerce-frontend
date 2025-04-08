"use client";

import { Minus, Plus } from "@/components/ui/icons";
import { Button } from "../ui/button";

type Props = {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

const QuantityInput = ({ value, onIncrement, onDecrement }: Props) => (
  <div className="flex items-center border rounded-md min-w-[112px] justify-between">
    <Button
      variant="ghost"
      size="sm"
      onClick={onDecrement}
      className="hover:bg-accent"
    >
      <Minus className="w-4 h-4" />
    </Button>

    <span className="text-center w-6">{value}</span>

    <Button
      variant="ghost"
      size="sm"
      onClick={onIncrement}
      className="hover:bg-accent"
    >
      <Plus className="w-4 h-4" />
    </Button>
  </div>
);

export default QuantityInput;
