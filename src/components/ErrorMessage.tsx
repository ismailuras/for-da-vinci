import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-400 p-2 rounded-md flex justify-between">
      <p className="text-white text-lg">{message}</p>
    </div>
  );
};

export default ErrorMessage;
