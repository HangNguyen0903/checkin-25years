/* eslint-disable @typescript-eslint/no-explicit-any */
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  label?: string;
  type?: string;
  placeholder?: string;
  // error?: FieldError;
  registration?: UseFormRegisterReturn;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  width?: string;
  required?: boolean;
  row?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minLength?: number;
  maxLength?: number;
};

export default function InputField({
  label,
  type = "text",
  placeholder,
  // error,
  registration,
  leftIcon,
  rightIcon,
  className,
  width,
  required,
  row,
  value,
  onChange,
  minLength,
  maxLength,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  return (
    <div className="">
      {label && (
        <label className="block font-medium mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          placeholder={placeholder}
          {...registration}
          className={`border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
          rows={row ?? 5}
          maxLength={maxLength}
          minLength={minLength}
        />
      ) : (
        <div className="relative w-full">
          {leftIcon && (
            <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">
              {leftIcon}
            </span>
          )}
          <input
            type={isPassword ? (showPassword ? "text" : "password") : type}
            placeholder={placeholder}
            {...registration}
            value={value}
            onChange={onChange}
            className={`border border-gray-300 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 
              ${width ?? "w-full"}
              ${leftIcon ? "pl-8" : "pl-2"}
              ${isPassword || rightIcon ? "pr-8" : "pr-2"}
             ${className}`}
          />
          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          ) : (
            rightIcon && (
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500">
                {rightIcon}
              </span>
            )
          )}
        </div>
      )}
    </div>
  );
}
