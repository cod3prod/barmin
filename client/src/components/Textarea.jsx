import { twMerge } from "tailwind-merge";

export default function Textarea(props) {
  const { children, id, className, ...rest } = props;
  return (
    <div>
      <label
        htmlFor={id}
        className={twMerge(
          "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        )}
      >
        {children}
      </label>
      <textarea
        id={id}
        name={id}
        className={twMerge(
          "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500",
          className
        )}
        {...rest}
      ></textarea>
    </div>
  );
}
