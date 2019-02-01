import actionTypes from "../constant/actionTypes";
import fetchStatus from "../constant/fetchStatus";
export const INITAL_STATE = {
  listSkin: [],
  listChampion: [],
  skinFetchStatus: "",
  championFetchStatus: ""
};

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LIST_SKIN_BEING_FETCHED:
      return {
        ...state,
        skinFetchStatus: fetchStatus.SKIN_BEING_FETCHED
      };
    case actionTypes.LIST_SKIN_FETCHED_SUCCESSFULLY:
      return {
        ...state,
        listSkin: action.listSkin,
        skinFetchStatus: fetchStatus.SKIN_FETCHED_SUCCESSFULLY
      };
    case actionTypes.LIST_SKIN_FETCHED_FAILED:
      return {
        ...state,
        skinFetchStatus: `${fetchStatus.SKIN_FETCHED_FAILED}: ${action.error}`
      };
    case actionTypes.LIST_CHAMPION_BEING_FETCHED:
      return {
        ...state,
        championFetchStatus: fetchStatus.CHAMPION_BEING_FETCHED
      };
    case actionTypes.LIST_CHAMPION_FETCHED_SUCCESSFULLY:
      return {
        ...state,
        championFetchStatus: fetchStatus.CHAMPION_FETCHED_SUCCESSFULLY,
        listChampion: action.listChampion
      };
    case actionTypes.LIST_CHAMPION_FETCHED_FAILED:
      return {
        ...state,
        championFetchStatus: `${fetchStatus.CHAMPION_FETCHED_FAILED}: ${
          action.error
        }`
      };
    default:
      return state;
  }
};
