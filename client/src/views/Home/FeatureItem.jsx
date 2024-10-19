import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import ImageSkeleton from "../../components/ImageSkeleton";

export default function FeatureItem(props) {
  const [order, setOrder] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const { index } = props;

  const numbers = ["One", "Two", "Three", "Four"];
  const descriptions = [
    "원하는 장소를 지도에서 클릭하여 쉽게 선택할 수 있습니다.",
    "장소 선택 후 타이틀을 입력하면 해당 장소에 설명을 추가할 수 있습니다.",
    "지역명을 검색하여 해당 위치와 주변 장소들을 지도에서 확인할 수 있습니다.",
    "선택한 특정 장소에 대해 별점을 매기고 리뷰를 작성할 수 있습니다.",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setOrder(prevOrder => (prevOrder === 2 ? 1 : 2));
    }, 1500);

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">{`Feature ${numbers[index]}`}</h3>

      {isLoading && <ImageSkeleton />}
      <img
        className={twMerge("w-full",isLoading ? "hidden" : "")}
        src={`/feat${index + 1}-${order}.png`}
        alt={`feat${index + 1}-${order}`}
        onLoad={() => setIsLoading(false)}
      />
      <p className="mt-4 text-gray-600">
        {descriptions[index]}
      </p>
    </div>
  );
}
