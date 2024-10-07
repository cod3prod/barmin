import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { twMerge } from "tailwind-merge";
import { useKakaoLoader } from "react-kakao-maps-sdk";
import { KAKAOJSKEY } from "../config/config.js";

export default function KakaoMap(props) {
  const [loading, error] = useKakaoLoader({
    appkey: KAKAOJSKEY,
    libraries: ["services", "clusterer", "drawing"],
  });

  const { className, setAddress, setCoordinate, title, coordinate, ...rest } =
    props;
  const [center, setCenter] = useState({ lat: 33.5563, lng: 126.79581 });

  const searchAddrFromCoords = (coords, callback) => {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
  };

  useEffect(() => {
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
  }, []);

  const handleClick = (_, mouseEvent) => {
    const latlng = mouseEvent.latLng;
    setCoordinate({
      lat: latlng.getLat(),
      lng: latlng.getLng(),
    });

    searchAddrFromCoords(latlng, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setAddress(result[0].address_name);
        console.log('address', result[0].address_name);
      }
    });


  };

  return (
    <Map
      className={twMerge(className)}
      id="map"
      center={center}
      style={{ width: "100%", height: "360px" }}
      onClick={handleClick}
      {...rest}
    >
      <MapMarker position={coordinate}>
        {title && <div style={{ color: "#000" }}>{title}</div>}
      </MapMarker>
    </Map>
  );
}
