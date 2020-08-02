import loginReducer from "./login";
import { combineReducers } from "redux";
import userReducer from "./user";
import homeReducer from "./home";
import searchReducer from "./search";

const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
  search: searchReducer,
  home: homeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
