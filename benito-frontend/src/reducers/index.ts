import loginReducer from "./login";
import { combineReducers } from "redux";
import userReducer from "./user";

const rootReducer = combineReducers({ login: loginReducer, user: userReducer });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
