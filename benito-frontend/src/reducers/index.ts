import { combineReducers } from "redux";
import sessionReducer from "./session";
import homeReducer from "./home";
import searchReducer from "./search";
import commonReducer from "./common";
import projectReducer from "./project";
import routesReducer from "./routes";

const rootReducer = combineReducers({
  session: sessionReducer,
  search: searchReducer,
  home: homeReducer,
  common: commonReducer,
  project: projectReducer,
  routes: routesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
