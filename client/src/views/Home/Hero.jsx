import NavButton from "../../components/NavButton";
import 'animate.css'
export default function Hero() {
  return (
    <section className="relative h-screen">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src="/rings.webm" type="video/webm" />
      </video>

      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg flex justify-center items-center">
        <div className="animate__animated animate__fadeInUp text-center">
          <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-6xl">
            주변의 철봉을 찾아보세요!
          </h1>
          <p className="mt-6 mb-6 text-lg leading-8 text-slate-300">
            운동을 더 쉽게, 더 가까이.
          </p>
          <NavButton
            className="w-24 text-white bg-transparent  hover:bg-white hover:text-black focus:ring-0 border border-white rounded-none"
            to="/locations"
          >
            시작하기
          </NavButton>
        </div>
      </div>
    </section>
  );
}
