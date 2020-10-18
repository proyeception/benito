import { createStore, compose } from "redux";
import rootReducer, { RootState } from "./reducers/index";
import { NOTHING } from "./store/search/types";
import { SortMethod } from "./types";
import Cookies from "js-cookie";

const defaultState: RootState = {
  session: {
    isLoggedIn: false,
  },
  home: {
    featuredProjects: [],
    latestProjects: [],
    projectTotal: 0,
  },
  search: {
    orderBy: SortMethod.DateDesc,
    status: NOTHING,
  },
  common: {
    categories: [],
    organizations: [],
    isMenuOpen: false,
    loading: false,
    customizationToken: Cookies.get("x-customization-token"),
  },
  project: {
    editionRole: "VISITOR",
    isEditing: false,
    authorsToAdd: [],
    authorsToDelete: [],
    supervisorsToAdd: [],
    supervisorsToDelete: [],
  },
};

const store = createStore(
  rootReducer,
  defaultState,
  ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)()
);

export default store;
