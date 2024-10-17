import LocationItem from "./LocationItem";

export default function LocationsList(props) {
  const { data, state } = props;

  const filteredData = data.filter((location) => {
    const { lat, lng } = location.coordinate;
    const { lat: swLat, lng: swLng } = state.swLatLng;
    const { lat: neLat, lng: neLng } = state.neLatLng;

    return lat > swLat && lat < neLat && lng > swLng && lng < neLng;
  });

  return (
    <div className="custom-scroll h-[35rem] flex flex-col overflow-y-auto lg:w-2/5">
      {filteredData.length === 0 ? (
        <p className='h-full flex justify-center items-center'>아무것도 없나요? 새로 등록해주세요!</p>
      ) : (
        filteredData.map((location) => (
          <LocationItem key={location._id} location={location} />
        ))
      )}
    </div>
  );
}
