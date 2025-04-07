import { ChangeEvent, useState, useCallback } from "react";

/**
 * Handles a numeric input manually (especially for `type="tel"` inputs)
 */
export default function useNumericInput({
  min = 0,
  max = 1000000,
}: {
  min?: number;
  max?: number;
} = {}) {
  const [value, setValue] = useState("");

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;

      if (!/^[0-9]*[.,]?[0-9]{0,2}$/.test(val)) return;

      const numeric = parseFloat(val.replace(",", "."));

      if (val === "" || isNaN(numeric)) {
        setValue("");
        return;
      }

      if (numeric < min || numeric > max) return;

      setValue(val);
    },
    [min, max]
  );

  return { value, handleChange };
}
