import NavButton from "../../components/NavButton";

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold tracking-tighter text-gray-900 sm:text-6xl">
        주변의 철봉을 찾아보세요!
      </h1>
      <p className="mt-6 mb-6 text-lg leading-8 text-gray-600">
        운동을 더 쉽게, 더 가까이.
      </p>
      <NavButton
        className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300"
        to="/locations"
      >
        시작하기
      </NavButton>
    </div>
  );
}
