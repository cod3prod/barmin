import { twMerge } from "tailwind-merge";

export default function ImagesPreview({className, images, deleteImage}) {
  return (
    <div className={twMerge("p-4 flex flex-wrap gap-4", className)}>
      {images.map((image, index) => (
        <div key={index} className="flex flex-col">
          <img
            src={image.url ||URL.createObjectURL(image)}
            alt={`Preview ${index}`}
            className="w-full h-32 object-cover rounded"
          />
          <button type="button" onClick={() => deleteImage(index)}>
            삭제
          </button>
        </div>
      ))}
    </div>
  );
}
