import { createStore, compose } from "redux";
import rootReducer, { RootState } from "./reducers/index";
import { SortMethod } from "./store/search/types";

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
  home: {
    featuredProjects: [],
    latestProjects: [],
    projectTotal: 0,
  },
  search: {
    name: "",
    category: "",
    projects: [],
    fromDate: "",
    toDate: "",
    keyword: "",
    documentation: "",
    sortMethod: SortMethod.DateDesc,
  },
  common: {
    categories: [],
    isMenuOpen: false,
  },
};

const store = createStore(
  rootReducer,
  defaultState,
  ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)()
);

export default store;
