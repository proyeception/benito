import { combineReducers } from "redux";
import sessionReducer from "./session";
import homeReducer from "./home";
import searchReducer from "./search";
import commonReducer from "./common";

const rootReducer = combineReducers({
  session: sessionReducer,
  search: searchReducer,
  home: homeReducer,
  common: commonReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
