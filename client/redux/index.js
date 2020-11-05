import { combineReducers } from "redux";
import sampleReducer from "./sampleReducer";

const reducer = combineReducers({
  sampleReducer: sampleReducer
})

export default reducer
