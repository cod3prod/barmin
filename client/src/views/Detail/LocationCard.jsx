import { Form } from "react-router-dom";
import NavButton from "../../components/NavButton";
import Button from "../../components/Button";
import ImageSkeleton from "../../components/ImageSkeleton";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import LocationImages from "./LocationImages";
import LocationDescription from "./LocationDescription";
import DeleteForm from "./DeleteForm";

export default function LocationCard({ data }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="overflow-hidden mb-4 border border-gray-300 rounded-lg">
      {isLoading && (
        <ImageSkeleton className="border-none" height="h-[25rem]" />
      )}
      <LocationImages data={data} isLoading={isLoading} setIsLoading={setIsLoading} />
      <LocationDescription data={data} />
      <DeleteForm data={data} />
    </div>
  );
}
