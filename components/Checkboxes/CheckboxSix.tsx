"use client";
import { useState } from "react";

const CheckboxSix = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <div>
      <label
        htmlFor="checkboxLabelSix"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="checkboxLabelSix"
            className="sr-only"
            onChange={() => {
              setIsChecked(!isChecked);
            }}
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
              isChecked && "border-primary bg-gray dark:bg-transparent"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-sm ${isChecked && "bg-primary"}`}
            ></span>
          </div>
        </div>
        Akte Pendirian
      </label>
    </div>
  );
};

export default CheckboxSix;
