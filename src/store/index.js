import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers";
import listDataReducer, { INITAL_STATE } from "../reducers/listDataReducer";
const store = createStore(
  listDataReducer,
  INITAL_STATE,
  applyMiddleware(thunk)
);

export default store;
