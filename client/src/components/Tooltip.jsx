import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Tooltip(props) {
  const { children, className, content } = props;
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div
          className={twMerge(
            "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-32 bg-gray-800 text-white text-center rounded p-2 transition-opacity duration-300",
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
