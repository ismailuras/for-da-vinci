import React, { useState, type ReactNode } from "react";
import { usePopper } from "react-popper";

interface PopperProps {
  children: ReactNode;
  content: ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
}

const Popper: React.FC<PopperProps> = ({
  children,
  content,
  placement = "bottom",
}) => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [{ name: "arrow", options: { element: arrowElement } }],
  });

  return (
    <>
      <div ref={setReferenceElement} className="inline-block relative z-50">
        {children}
      </div>

      <div
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        className="z-50 bg-white shadow-md rounded-md p-4 aspect-square w-40 h-40 overflow-auto sm:aspect-auto sm:w-auto sm:h-auto"
      >
        {content}
        <div
          ref={setArrowElement}
          style={styles.arrow}
          className="bg-white w-2 h-2 rotate-45"
        />
      </div>
    </>
  );
};

export default Popper;
