import actionTypes from "../constant/actionTypes";
export default {
  listChampionBeingFetched: () => ({
    type: actionTypes.LIST_CHAMPION_BEING_FETCHED
  }),
  listChampionFetchedSuccessfully: listChampion => ({
    type: actionTypes.LIST_CHAMPION_FETCHED_SUCCESSFULLY,
    listChampion
  }),
  listChampionFetchedFailed: error => ({
    type: actionTypes.LIST_CHAMPION_FETCHED_FAILED,
    error
  }),
  listSkinBeingFetched: () => ({
    type: actionTypes.LIST_SKIN_BEING_FETCHED
  }),
  listSkinFetchedSuccessfully: listSkin => ({
    type: actionTypes.LIST_SKIN_FETCHED_SUCCESSFULLY,
    listSkin
  }),
  listSkinFetchedFailed: error => ({
    type: actionTypes.LIST_SKIN_FETCHED_FAILED,
    error
  })
};
