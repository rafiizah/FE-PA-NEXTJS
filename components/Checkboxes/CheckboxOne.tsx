"use client";
import { useState } from "react";

const CheckboxOne = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [legalitas_usaha, setLegalitas_usaha] = useState("");

  return (
    <div>
      <label
        htmlFor="checkboxLabelOne"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="checkboxLabelOne"
            className="sr-only"
            value={legalitas_usaha}
            onChange={(e) => {
              setIsChecked(!isChecked), setLegalitas_usaha(e.target.value);
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
        NPWP / Nomor Pokok Wajib Pajak
      </label>
    </div>
  );
};

export default CheckboxOne;
