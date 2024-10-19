import { twMerge } from "tailwind-merge";

export default function Button(props) {
  const { children, className, ...rest } = props;

  return (
    <button
      className={twMerge(
        "text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm h-10 w-16 px-4 py-2.5",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
