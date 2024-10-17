import { Link } from "react-router-dom";
import Tooltip from "../../components/Tooltip";
import { FaPlus, FaSearch } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import Input from "../../components/Input";

export default function GeoTools(props) {
  const { state, dispatch } = props;

  const getMyLocation = () => {
    const success = (position) => {
      dispatch({
        type: "SET_COORDINATE",
        payload: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      });
    };

    const error = () => {
      // 이것도 플래시 메시지로 만들 수 있지 않을까?
      alert("위치 정보를 허락해주세요!");
    };

    navigator.geolocation.getCurrentPosition(success, error);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const searchCoordsFromAddr = (address) => {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          dispatch({
            type: "SET_COORDINATE",
            payload: { lat: coords.Ma, lng: coords.La },
          });
        } else {
          // 플래시 메시지 만들기
          console.log("error");
        }
      });
    };

    searchCoordsFromAddr(state.addressForSearch);
    dispatch({ type: "SET_ADDRESS", payload: "" });
  };

  return (
    <div className="w-full px-4 pt-4 flex justify-between items-center">
      <div className="flex gap-2">
        <Tooltip
          className="w-36 z-50 translate-y-[150%] translate-x-0"
          content="새로운 장소를 추가합니다"
        >
          <Link to="/locations/new">
            <FaPlus className="text-2xl text-gray-300 cursor-pointer hover:text-black" />
          </Link>
        </Tooltip>

        <Tooltip
          className="w-36 z-50 translate-y-[150%] translate-x-0"
          content="본인 주변의 철봉을 찾습니다"
        >
          <FiMapPin
            className="text-2xl text-gray-300 cursor-pointer hover:text-black"
            onClick={getMyLocation}
          />
        </Tooltip>
      </div>
      <form onSubmit={submitHandler} className="flex items-center gap-2">
        <Tooltip
          className="w-36 z-50 translate-y-[200%] translate-x-0"
          content="주소로 검색합니다"
        >
          <FaSearch
            className="text-2xl text-gray-300 cursor-pointer hover:text-black"
            onClick={submitHandler}
          />
        </Tooltip>
        <Input
          className="w-40 md:w-72"
          value={state.addressForSearch}
          onChange={(e) =>
            dispatch({ type: "SET_ADDRESS", payload: e.target.value })
          }
        />
      </form>
    </div>
  );
}
