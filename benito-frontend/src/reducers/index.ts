import loginReducer from "./login";
import { Reducer, combineReducers } from "redux";

const rootReducer: Reducer = combineReducers({ login: loginReducer });

export default rootReducer;
