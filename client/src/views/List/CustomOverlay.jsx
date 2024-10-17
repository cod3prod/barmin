import { MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { FaX } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function CustomOverlay(props) {
  const { location, isOpen, onToggle } = props;
  return (
    <>
      <MapMarker
        position={{
          lat: location.coordinate.lat,
          lng: location.coordinate.lng,
        }}
        onClick={onToggle}
      />
      {isOpen && (
        <CustomOverlayMap
          position={{
            lat: location.coordinate.lat,
            lng: location.coordinate.lng,
          }}
        >
          <div className='w-64 p-2 bg-white rounded shadow-lg -translate-y-[90%]'>
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold">{location.title}</p>
              <div onClick={onToggle} className="cursor-pointer">
                <FaX />
              </div>
            </div>
            <div className="flex mt-2">
              <img
                src={location.images[0].url}
                alt={location.title}
                className="w-16 h-16 mr-2"
              />
              <div className="grow space-y-4">
                <p className="text-sm line-clamp-1">{location.description}</p>
                <p className="text-end">
                  <Link
                    to={`/locations/${location._id}`}
                    className="text-sm hover:text-blue-500"
                  >
                    자세히 보기
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </CustomOverlayMap>
      )}
    </>
  );
}
