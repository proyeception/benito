import { createStore, compose } from "redux";
import rootReducer from "./reducers/index";

type State = {
  login: {
    username: String;
    password: String;
  };
};

const defaultState: State = {
  login: {
    username: "",
    password: "",
  },
};

const store: any = createStore(
  rootReducer,
  defaultState,
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
);

export default store;
