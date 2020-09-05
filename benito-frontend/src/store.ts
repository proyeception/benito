import { createStore, compose } from "redux";
import rootReducer, { RootState } from "./reducers/index";
import { SortMethod } from "./store/search/types";

const defaultState: RootState = {
  session: {
    isLoggedIn: false,
    fetching: false,
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
    organization: "",
  },
  common: {
    categories: [],
    isMenuOpen: false,
  },
  project: {
    canEdit: false,
  },
};

const store = createStore(
  rootReducer,
  defaultState,
  ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)()
);

export default store;
