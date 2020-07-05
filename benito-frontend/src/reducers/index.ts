import loginReducer from "./login";
import { combineReducers } from "redux";

const rootReducer = combineReducers({ login: loginReducer });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
