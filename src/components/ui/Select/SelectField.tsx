import React from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps {
  options: Option[];
  title?: string;
  value?: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: FieldError;
  registration?: UseFormRegisterReturn;
}

const Select: React.FC<SelectProps> = ({
  title,
  options,
  value,
  onChange,
  placeholder = "Chọn...",
  disabled = false,
  className = "",
}) => {
  return (
    <div className="">
      {title && (
        <label className="block font-medium mb-1">
          {title}
          {/* {registration && <span className="text-red-500 ml-1">*</span>} */}
        </label>
      )}
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-gray-400  ${className}`}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
