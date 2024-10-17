import { twMerge } from "tailwind-merge";

export default function Tooltip(props) {
  const { children, className, content } = props;

  return (
    <div className="relative inline-block group">
      {children}
      <div
        className={twMerge(
          "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-32 bg-gray-800 text-white text-center rounded p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          className
        )}
      >
        {content}
      </div>
    </div>
  );
}
