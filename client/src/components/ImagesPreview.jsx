import { useState } from "react";
import { twMerge } from "tailwind-merge";
import ImageSkeleton from "./ImageSkeleton";
import { CiFileOff } from "react-icons/ci";

export default function ImagesPreview({className, images, handleDeleteImage}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  return (
    <div className={twMerge("p-4 flex flex-wrap gap-4", className)}>
      {images.map((image, index) => (
        <div key={index} className="flex flex-col">
          {isLoading && <ImageSkeleton className='border-none p-0 w-32' height='h-32' /> }
          {isError && <CiFileOff className='text-center w-full h-32' /> }
          <img
            src={image.url}
            alt={`Preview ${index}`}
            className={twMerge("w-full h-32 object-cover rounded", isError && "hidden", isError && "hidden")}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsError(true)}
          />
          <button type="button" onClick={() => handleDeleteImage(index)}>
            삭제
          </button>
        </div>
      ))}
    </div>
  );
}
