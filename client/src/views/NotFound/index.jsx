import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-500 to-gray-300 text-white">
      <p className="text-7xl font-extrabold drop-shadow-lg">404</p>
      <p className="mt-4 text-2xl">페이지를 찾을 수 없습니다.</p>
      <p className="mt-2 text-lg">원하는 내용을 찾을 수 없습니다.</p>
      <Link
        href="/"
        className="mt-8 px-6 py-3 bg-white text-gray-800 font-semibold rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
