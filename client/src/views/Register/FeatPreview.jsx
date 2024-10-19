export default function FeatPreview() {
  return (
    <div className="absolute pt-12 px-10 lg:px-12 bottom-0 left-10 w-1/2 h-2/3 rounded-t-[4rem] bg-white overflow-hidden">
      <img
        className="w-full rounded-lg object-contain border border-gray-100"
        src="./preview.webp"
        alt="feat1"
      />
    </div>
  );
}
