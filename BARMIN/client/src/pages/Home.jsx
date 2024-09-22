import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold tracking-tighter text-gray-900 sm:text-6xl">
        주변의 철봉을 찾아보세요!
      </h1>
      <p className="mt-6 mb-6 text-lg leading-8 text-gray-600">
        운동을 더 쉽게, 더 가까이.
      </p>
      <button
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => {
          navigate("/locations");
        }}
      >
        시작하기
      </button>
    </div>
  );
}

export default function Home() {
  return <Landing />;
}
