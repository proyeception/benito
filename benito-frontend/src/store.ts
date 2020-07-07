import { createStore, compose } from "redux";
import rootReducer, { RootState } from "./reducers/index";

const defaultState: RootState = {
  login: {
    username: "",
    password: "",
    displayLoader: false,
  },
};

const store = createStore(
  rootReducer,
  defaultState,
  ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)()
);

export default store;
