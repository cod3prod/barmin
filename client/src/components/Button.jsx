import { twMerge } from "tailwind-merge";

export default function Button(props) {
  const { children, className, ...rest } = props;

  return (
    <button
      className={twMerge(
        "text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
