import { FaGithub, FaHome } from "react-icons/fa"; // GitHub 및 Home 아이콘
import { Link } from "react-router-dom";

export default function Reference() {
  return (
    <div className="flex justify-center items-center h-36 bg-black">
      <Link
        to="https://www.github.com/cod3prod" // GitHub 페이지 링크
        target="_blank"
        className="w-28 h-28 flex flex-col items-center justify-center p-4 border border-orange-300 rounded-lg hover:bg-orange-600 transition-colors duration-200"
      >
        <FaGithub className="text-orange-300 text-4xl" />
        <span className="mt-2 text-gray-400">GitHub</span>
      </Link>

      <Link
        to="/"
        className="w-28 h-28 flex flex-col items-center justify-center p-4 border border-orange-300 rounded-lg hover:bg-orange-600 transition-colors duration-200 ml-4"
      >
        <FaHome className="text-orange-300 text-4xl" />
        <span className="mt-2 text-gray-400">Portfolio</span>
      </Link>
    </div>
  );
}
