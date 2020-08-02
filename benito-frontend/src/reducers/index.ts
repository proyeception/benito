import loginReducer from "./login";
import { combineReducers } from "redux";
import userReducer from "./user";
import projectReducer from "./project";

const rootReducer = combineReducers({ login: loginReducer, user: userReducer, project:projectReducer });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
