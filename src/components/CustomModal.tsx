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
      className={`${"fixed top-0 left-0 w-full h-full bg-[#00000099]"} ${
        open ? "block" : "hidden"
      }`}
    >
      <div className="fixed bg-white w-[35rem] h-auto top-[50%] left-[50%] translate-[-50%] rounded-md py-4 px-10">
        <div className="flex justify-between mt-2">
          <h1 className="text-lg font-semibold">{title}</h1>
          <button
            type="button"
            className="bg-red-400 text-white rounded-md px-4 cursor-pointer"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="my-8">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
