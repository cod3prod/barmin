export const initialState = {
  coordinate: {},
  addressForSearch: "",
  swLatLng: { lat: -90, lng: -180 },
  neLatLng: { lat: 90, lng: 180 },
};

export const geoReducer = (state, action) => {
  switch (action.type) {
    case "SET_COORDINATE":
      return { ...state, coordinate: action.payload };
    case "SET_SWLATLNG":
      return { ...state, swLatLng: action.payload };
    case "SET_NELATLNG":
      return { ...state, neLatLng: action.payload };
    case "SET_ADDRESS":
      return { ...state, addressForSearch: action.payload };
    default:
      return state;
  }
};
