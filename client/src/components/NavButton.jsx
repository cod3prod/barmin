import { twMerge } from "tailwind-merge"
import { Link } from "react-router-dom"

export default function NavButton(props) {
    const {children, className, ...rest} = props;
  return (
    <Link className={twMerge("inline-block text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2", className)} {...rest}>{children}</Link>
  )
}