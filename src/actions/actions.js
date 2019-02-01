import actionCreators from "./actionCreators";
import { axiosInstance } from "./../api/RestfullAPI";
import { SKIN_END_POINT, CHAMPION_END_POINT } from "../constant/apiInfo";

export const fetchChampionList = () => async dispatch => {
  dispatch(actionCreators.listChampionBeingFetched());
  try {
    await axiosInstance.get(CHAMPION_END_POINT).then(response => {
      return dispatch(
        actionCreators.listChampionFetchedSuccessfully(response.data)
      );
    });
  } catch (error) {
    return dispatch(actionCreators.listChampionFetchedFailed(error));
  }
};

export const fetchSkinList = () => async dispatch => {
  dispatch(actionCreators.listSkinBeingFetched());
  try {
    await axiosInstance.get(SKIN_END_POINT).then(response => {
      return dispatch(
        actionCreators.listSkinFetchedSuccessfully(response.data)
      );
    });
  } catch (error) {
    return dispatch(actionCreators.listSkinFetchedFailed(error));
  }
};
