export default function LocationImage({ src, alt }) {
    return (
      <div className="w-1/3 h-full overflow-hidden rounded-tl-lg rounded-bl-lg">
        <img className="w-full h-full object-cover" alt={alt} src={src} />
      </div>
    );
  }
  