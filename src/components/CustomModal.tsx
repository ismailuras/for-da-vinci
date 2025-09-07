import React, { type ReactElement } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactElement;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children, title }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black/60 z-50 ${
        open ? "flex" : "hidden"
      } items-center justify-center p-4`}
    >
      <div className="bg-white w-full max-w-lg max-h-[90vh] rounded-lg shadow-xl overflow-hidden">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate pr-4">
            {title}
          </h1>
          <button
            type="button"
            className="flex-shrink-0 bg-red-500 hover:bg-red-600 text-white rounded-md px-3 py-1.5 sm:px-4 sm:py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
