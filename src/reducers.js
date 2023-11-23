import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
} from "./actions";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: true,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  localStorage.getItem("s10g4");
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      const updatedFavs = [...state.favs, action.payload];
      writeFavsToLocalStorage(updatedFavs);
      return { ...state, favs: updatedFavs };

    case FAV_REMOVE:
      const newFavs = state.favs.filter((fav) => fav.id !== action.payload);
      writeFavsToLocalStorage(newFavs);
      return { ...state, favs: newFavs };

    case FETCH_SUCCESS:
      return { ...state, current: action.payload, loading: false };

    case FETCH_LOADING:
      return { ...state, loading: true };

    case FETCH_ERROR:
      return { ...state, error: action.payload, loading: false };

    case GET_FAVS_FROM_LS:
      const localFavs = readFavsFromLocalStorage();
      return { ...state, favs: localFavs || [] };
    default:
      return state;
  }
}
