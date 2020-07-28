import loginReducer from "./login";
import { combineReducers } from "redux";
import userReducer from "./user";
import homeReducer from "./home";

const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
  home: homeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
