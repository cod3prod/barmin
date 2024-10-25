import { useState } from "react";
import "animate.css";

export default function LoginTypo({ isLoading }) {
  const [isTyping, setIsTyping] = useState(true);

  return (
    <div className="relative hidden md:flex z-10 max-w-md mx-auto h-full lg:w-1/2 p-4 bg-transparent rounded-lg flex-col justify-center">
      <p
        className={`text-3xl lg:text-5xl font-bold mb-10 ${
          isLoading ? "invisible" : "animate__animated animate__fadeInLeft"
        }`}
        onAnimationEnd={() => {
          if (!isLoading) setIsTyping(false);
        }}
      >
        지금 로그인하세요!
      </p>
      <div
        className={`${
          !isTyping && !isLoading
            ? "animate__animated animate__fadeInLeft block"
            : "invisible"
        }`}
      >
        <p className="text-2xl lg:text-3xl mb-1">
          함께 더 나은 <span className="font-bold">경험</span>을
        </p>
        <p className="text-2xl lg:text-3xl"> 만들어 갑시다.</p>
      </div>
    </div>
  );
}
