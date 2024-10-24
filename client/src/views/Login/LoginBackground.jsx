import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

export default function LoginBackground({ isLoading, setIsLoading }) {
  useEffect(() => {
    const img = new Image();
    img.src = "/login_background.webp";
    img.onload = () => {
      setIsLoading(false);
    };
  }, [setIsLoading]);

  return (
    <div
      className={twMerge(
        "hidden md:block absolute inset-0 bg-center bg-cover",
        isLoading ? "bg-[#e2f4fd]" : ""
      )}
      style={{ backgroundImage: "url('/login_background.webp')" }}
    >
      <div className="absolute inset-0 bg-white opacity-40"></div>
    </div>
  );
}
