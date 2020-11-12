import { createStore, compose } from "redux";
import rootReducer, { RootState } from "./reducers/index";
import { NOTHING } from "./store/search/types";
import { SortMethod } from "./types";
import { X_CUSTOMIZATION_TOKEN } from "./functions/session";

const defaultState: RootState = {
  session: {
    isLoggedIn: false,
    chatBotOpen: false
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
    loading: true,
    customizationToken:
      localStorage.getItem(X_CUSTOMIZATION_TOKEN) || undefined,
  },
  project: {
    editionRole: "VISITOR",
    isEditing: false,
    authorsToAdd: [],
    authorsToDelete: [],
    supervisorsToAdd: [],
    supervisorsToDelete: [],
  },
  routes: {
    routes: [],
  },
};

const store = createStore(
  rootReducer,
  defaultState,
  ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)()
);

export default store;
