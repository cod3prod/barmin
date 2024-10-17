import { useEffect, useState } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useKakaoLoader } from "react-kakao-maps-sdk";
import { KAKAOJSKEY } from "../config/config.js";

export default function KakaoMap(props) {
  const [loading, error] = useKakaoLoader({
    appkey: KAKAOJSKEY,
    libraries: ["services", "clusterer", "drawing"],
  });

  const { className, state, dispatch, centerChangeLimit, ...rest } = props;
  const [center, setCenter] = useState(
    Object.keys(state.coordinate).length !== 0
      ? state.coordinate
      : { lat: 33.5563, lng: 126.79581 }
  );
  const [checkCenterChange, setCheckCenterChange] = useState(0);

  useEffect(() => {
    if (checkCenterChange >= centerChangeLimit) return;

    if (Object.keys(state.coordinate).length !== 0) {
      setCenter(state.coordinate);
      setCheckCenterChange((prev) => prev + 1);
    } else {
      const success = (position) => {
        setCenter({
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        });
      };

      const error = () => {
        alert("위치 정보를 허락해주세요!");
      };

      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, [state.coordinate, checkCenterChange, centerChangeLimit]);

  const searchAddrFromCoords = (coords, callback) => {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
  };

  const handleClick = (_, mouseEvent) => {
    const latlng = mouseEvent.latLng;
    dispatch({
      type: "SET_COORDINATE",
      payload: {
        lat: latlng.getLat(),
        lng: latlng.getLng(),
      },
    });

    searchAddrFromCoords(latlng, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        dispatch({ type: "SET_ADDRESS", payload: result[0].address_name });
        console.log("search address from a coordinate", result[0].address_name);
      }
    });
  };

  if (loading)
    return <div>주변 위치 정보를 불러오는 중입니다.</div>;

  return (
    <Map
      id="map"
      center={center}
      style={{ width: "100%", height: "360px" }}
      onClick={handleClick}
      {...rest}
    >
      {state.coordinate && <MapMarker position={state.coordinate} />}
      {state.title && (
        <CustomOverlayMap position={state.coordinate}>
          <div className="w-32 p-2 bg-white rounded shadow-lg  -translate-y-[150%] truncate">
            {state.title}
          </div>
        </CustomOverlayMap>
      )}
    </Map>
  );
}
