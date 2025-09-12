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
  onChange,
  placeholder = "Chọn...",
  disabled = false,
  className = "",
  registration,
  error,
}) => {
  return (
    <div className="">
      {title && (
        <label className="block font-medium mb-1">
          {title}
          {registration && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        defaultValue=""
        onChange={(e) => {
          onChange?.(e.target.value);
          registration?.onChange?.(e);
        }}
        onBlur={registration?.onBlur}
        name={registration?.name}
        ref={registration?.ref}
        disabled={disabled}
        className={`border border-gray-300 rounded-md px- py-1 focus:ring-2 focus:ring-gray-400 w-full ${className} ${
          error ? "border-red-500" : ""
        }`}
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
      {/* {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>} */}
    </div>
  );
};

export default Select;
