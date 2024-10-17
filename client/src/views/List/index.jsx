import { useReducer } from "react";
import { useLoaderData } from "react-router-dom";
import { geoReducer, initialState } from "../../reducer/geoReducer";
import LocationsList from "./LocationsList";
import api from "../../config/api";
import KakaoCluster from "./KakaoCluster";
import GeoTools from "./GeoTools";

export async function loader() {
  try {
    const response = await api.get("/locations");
    const result = response.data;
    return result;
  } catch (error) {
    console.error("Fail to load locations", error);
  }
}

export default function List() {
  const data = useLoaderData();
  const [ state, dispatch ] = useReducer(geoReducer, initialState);

  return (
    <section className="mt-4 flex flex-col container mx-auto lg:max-w-7xl">
      <GeoTools state={state} dispatch={dispatch} />
      <div className="flex flex-col gap-4 p-4 lg:flex-row">
        <KakaoCluster data={data} state={state} dispatch={dispatch} />
        <LocationsList data={data} state={state} />
      </div>
    </section>
  );
}
