import { useState, useRef, useEffect } from "react";
import { Map, MarkerClusterer, ZoomControl } from "react-kakao-maps-sdk";
import { useKakaoLoader } from "react-kakao-maps-sdk";
import { KAKAOJSKEY } from "../../config/config.js";
import CustomOverlay from "./CustomOverlay.jsx";

export default function KakaoCluster(props) {
  const { data, state, dispatch } = props;

  const [loading, error] = useKakaoLoader({
    appkey: KAKAOJSKEY,
    libraries: ["services", "clusterer", "drawing"],
  });

  const [openOverlays, setIsOpenOverlays] = useState(
    new Array(data.length).fill(false)
  );

  const mapRef = useRef(null);

  const getMapInfo = () => {
    const map = mapRef.current;
    if (!map) return;
    const bounds = map.getBounds();

    // 남서
    const swLatLng = bounds.getSouthWest();
    // 북동
    const neLatLng = bounds.getNorthEast();

    dispatch({
      type: "SET_SWLATLNG",
      payload: { lat: swLatLng.Ma, lng: swLatLng.La },
    });
    dispatch({
      type: "SET_NELATLNG",
      payload: { lat: neLatLng.Ma, lng: neLatLng.La },
    });
  };

  useEffect(() => {
    getMapInfo();
  }, [state.coordinate]);

  const toggleOverlay = (idx) => {
    setIsOpenOverlays((prev) =>
      prev.map((isOpen, index) => (index === idx ? !isOpen : isOpen))
    );
  };

  return (
    <div className="w-full h-[20rem] lg:h-[35rem] lg:w-3/5">
      <Map // 지도를 표시할 Container
        center={
          Object.keys(state.coordinate).length !== 0
            ? state.coordinate
            : {
                // 지도의 중심좌표
                lat: 36.2683,
                lng: 127.6358,
              }
        }
        style={{
          // 지도의 크기
          width: "100%",
          height: "100%",
        }}
        level={Object.keys(state.coordinate).length !== 0 ? 7 : 13} // 지도의 확대 레벨
        ref={mapRef}
        onZoomChanged={getMapInfo}
        // onCenterChanged={getMapInfo}
        onCenterChanged={(map) => {
          dispatch({
            type: "SET_COORDINATE",
            payload: {
              lat: map.getCenter().Ma,
              lng: map.getCenter().La,
            },
          });
        }}
      >
        <ZoomControl />
        <MarkerClusterer
          averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel={10} // 클러스터 할 최소 지도 레벨
        >
          {data.map((location, index) => (
            <CustomOverlay
              location={location}
              key={`${location.coordinate.lat}-${location.coordinate.lng}`}
              isOpen={openOverlays[index]}
              onToggle={() => toggleOverlay(index)}
            />
          ))}
        </MarkerClusterer>
      </Map>
    </div>
  );
}
