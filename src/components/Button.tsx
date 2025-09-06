import React from "react";
import { clsx } from "clsx";

type ButtonProps = {
  label: string;
  className?: string;
  onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        className,
        "px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-900 cursor-pointer"
      )}
    >
      {label}
    </button>
  );
};
