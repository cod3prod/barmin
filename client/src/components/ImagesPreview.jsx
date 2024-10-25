import { twMerge } from "tailwind-merge";

export default function ImagesPreview({className, images, handleDeleteImage}) {
  return (
    <div className={twMerge("p-4 flex flex-wrap gap-4", className)}>
      {images.map((image, index) => (
        <div key={index} className="flex flex-col">
          <img
            src={image.url}
            alt={`Preview ${index}`}
            className="w-full h-32 object-cover rounded"
          />
          <button type="button" onClick={() => handleDeleteImage(index)}>
            삭제
          </button>
        </div>
      ))}
    </div>
  );
}
