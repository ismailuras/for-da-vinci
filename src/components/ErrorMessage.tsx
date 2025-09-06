import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const handleRefreshPage = () => window.location.reload();

  return (
    <div className="bg-red-400 p-2 rounded-md flex justify-between">
      <p className="text-white text-lg">{message}</p>
      <button
        className="px-4 bg-white text-dark rounded-md cursor-pointer font-semibold"
        onClick={handleRefreshPage}
      >
        Refresh
      </button>
    </div>
  );
};

export default ErrorMessage;
