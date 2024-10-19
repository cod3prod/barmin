import FeatPreview from "./FeatPreview";
export default function RegisterBackground() {
  return (
    <div className="hidden md:block absolute inset-0 bg-white md:bg-amber-50">
      <FeatPreview />
    </div>
  );
}
