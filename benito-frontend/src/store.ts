import { createStore, compose } from "redux";
import rootReducer, { RootState } from "./reducers/index";

const defaultState: RootState = {
  login: {
    username: "",
    password: "",
    displayLoader: false,
    isLoggedIn: false,
    passwordError: false,
    usernameError: false,
  },

  user: {
    session: null,
    username: null,
    data: null,
  },

  project: {
    id: null,
    title: null,
    description: null,
    posterUrl: null,
    authors: [],
    creationDate: new Date (),
    tags: []
  }
};

const store = createStore(
  rootReducer,
  defaultState,
  ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)()
);

export default store;
