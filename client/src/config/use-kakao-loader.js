import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk";
import { KAKAOJSKEY } from "./config.js";

export default function useKakaoLoader() {
  useKakaoLoaderOrigin({
    appkey: KAKAOJSKEY,
    libraries: ["services", "clusterer", "drawing"],
  });

}
