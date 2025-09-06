import React from "react";

interface NotFoundProps {
  target: string;
}
const NotFound: React.FC<NotFoundProps> = ({ target }) => {
  return (
    <div>
      <span className="font-semibold text-lg">{target}</span> not found.
    </div>
  );
};

export default NotFound;
