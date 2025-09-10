import type { ReactNode } from "react";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  color?: "primary" | "secondary" | "danger" | "success"; 
  fullWidth?: boolean;
  icon?: ReactNode;
  disabled?: boolean;
};

export default function ButtonField({
  text,
  onClick,
  type ='button' ,
  color = "primary",
  fullWidth = false,
  icon,
  disabled = false,
}: ButtonProps) {
    
  const baseStyle =
    "flex items-center justify-center gap-2 px-4 py-2 rounded font-medium transition-colors duration-200";

  const colors: Record<typeof color, string> = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    success: "bg-green-500 hover:bg-green-600 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${colors[color]} ${
        fullWidth ? "w-full" : ""
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span className="text-sm">{text}</span>
    </button>
  );
}
