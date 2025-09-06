import React from "react";
import { clsx } from "clsx";

type ButtonProps = {
  label: string;
  className?: string;
  onClick?: () => void;
  type?: "submit" | "button" | "reset";
};

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className,
  type = "submit",
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={clsx(
        className,
        "px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-900 cursor-pointer"
      )}
    >
      {label}
    </button>
  );
};
