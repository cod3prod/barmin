import FeatureItem from "./FeatureItem";
import { useInView } from "react-intersection-observer";
import "animate.css";

export default function Features() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  return (
    <section
      ref={ref}
      className={`animate__animated ${
        inView ? "animate__backInLeft" : ""
      } container mx-auto px-4 py-12`}
    >
      <div className="text-center mb-8">
        <p className="text-3xl font-bold">주요 기능</p>
        <p className="text-gray-600 mt-2">
          당신이 누릴 수 있는 다양한 기능들을 만나보세요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <FeatureItem key={index} index={index} />
        ))}
      </div>
    </section>
  );
}
