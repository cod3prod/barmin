import NavButton from "../../components/NavButton";

export default function PostItem({ location }) {
  return (
    <div className="mb-4 border border-gray-300 rounded-lg">
      <div className="h-28 flex">
        <img
          src={location.images[0].url}
          alt="thumbnail"
          className="w-1/3 h-full object-cover rounded-tl-lg rounded-bl-lg"
        />
        <div className="w-2/3 p-4">
          <p className="text-lg font-bold truncate">{location.title}</p>
          <p className="truncate">{location.description}</p>
          <div className="flex items-center justify-between">
            <p className="truncate text-gray-500 text-xs">{location.address}</p>
            <NavButton
              to={`/locations/${location._id}`}
              className="w-20 h-6 flex justify-center items-center text-xs bg-black hover:bg-gray-300 hover:text-black"
            >
              자세히
            </NavButton>
          </div>
        </div>
      </div>
    </div>
  );
}
