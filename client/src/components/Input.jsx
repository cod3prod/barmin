import { twMerge } from "tailwind-merge";

export default function Input(props) {
  const { children, id, type, className, ...rest } = props;
  return (
    <div>
      <label
        className={twMerge(
          "mb-2 text-sm font-medium text-gray-900 dark:text-white"
        )}
        htmlFor={id}
      >
        {children}
      </label>
      <input
        className={twMerge(
          "block w-full py-2 ps-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500",
          className
        )}
        type={type}
        id={id}
        name={id}
        {...rest}
      />
    </div>
  );
}
