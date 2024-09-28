import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import useKakaoLoader from "../config/use-kakao-loader.js";
import { twMerge } from "tailwind-merge";

export default function KakaoMap(props) {
  useKakaoLoader();
  const {className, ...rest} = props;
  const [center, setCenter] = useState({ lat: 33.5563, lng: 126.79581 });
  const [position, setPosition] = useState();
  const { title } = props;

  const success = (position) => {
    setCenter({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };

  const error = () => {
    alert("위치 정보를 허락해주세요!");
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  if (position) {
    console.log(position);
  }
  return (
    <Map
      className={twMerge(className)}
      id="map"
      center={center}
      style={{ width: "100%", height: "360px" }}
      onClick={(_, mouseEvent) => {
        const latlng = mouseEvent.latLng;
        console.log(latlng);
        setPosition({
          lat: latlng.getLat(),
          lng: latlng.getLng(),
        });
      }}
    >
      {position && (
        <MapMarker position={position}>
          <div style={{ color: "#000" }}>{title}</div>
        </MapMarker>
      )}
    </Map>
  );
}
