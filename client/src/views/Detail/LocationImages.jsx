import { twMerge } from "tailwind-merge";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function LocationImages(props) {
  const { data, isLoading, setIsLoading } = props;

  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={20}
      slidesPerView={1}
      navigation // 네비게이션 버튼 활성화
      className={twMerge(
        "w-full h-[25rem] object-cover",
        isLoading && "hidden"
      )}
    >
      {data.images.map((image, index) => (
        <SwiperSlide key={image._id}>
          <img
            src={image.url}
            alt={`image ${index + 1}`}
            className={twMerge(
              "w-full h-[25rem] object-cover",
              isLoading && "hidden"
            )}
            onLoad={() => setIsLoading(false)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
