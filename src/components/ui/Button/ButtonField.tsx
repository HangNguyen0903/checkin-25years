import type { ReactNode } from "react";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  color?: "primary" | "secondary" | "danger" | "success";
  fullWidth?: boolean;
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
};

export default function ButtonField({
  text,
  onClick,
  type = "button",
  color = "primary",
  fullWidth = false,
  icon,
  disabled = false,
  className,
}: ButtonProps) {
  const baseStyle =
    "flex items-center justify-center gap-2 px-3 py-1 rounded font-medium transition-colors duration-200";

  const colors: Record<typeof color, string> = {
    primary: "bg-blue-900 hover:bg-blue-800 text-white",
    secondary: "border border-gray-300 hover:bg-gray-100 text-gray-800",
    danger:
      "border border-red-500 text-red-500 hover:bg-red-600 hover:text-white",
    success: "bg-green-700 hover:bg-green-600 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${colors[color]} ${fullWidth ? "w-full" : ""} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span className="text-sm">{text}</span>
    </button>
  );
}
