import { useState } from 'react';
import ImageSkeleton from '../../components/ImageSkeleton';
import { CiFileOff } from "react-icons/ci";

export default function PostThumbnail({ src, alt }) {
      const [isLoading, setIsLoading] = useState(true);
      const [isError, setIsError] = useState(false);

  return (
      <div className="w-1/3 h-full overflow-hidden rounded-tl-lg rounded-bl-lg">
        {isLoading && <ImageSkeleton className='border-none p-0' height='h-[7rem]' />}
        {isError && <CiFileOff className='text-center w-full h-[7rem]' />}
        <img className="w-full h-full object-cover" alt={alt} src={src} onLoad={() => setIsLoading(false)} onError={() => setIsError(true)} />
      </div>
    );
  }
  