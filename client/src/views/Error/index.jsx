import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-500 to-red-300 text-white">
      <p className="text-7xl font-extrabold drop-shadow-lg">잠깐!</p>
      <p className="mt-4 text-2xl">무언가 잘못되었습니다.</p>
      <p className="mt-2 text-lg">잠시 후 다시 시도해 주세요.</p>
      <Link
        href="/"
        className="mt-8 px-6 py-3 bg-white text-red-500 font-semibold rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
