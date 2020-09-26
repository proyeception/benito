import { Category } from "../../types";

export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
export const TOGGLE_HAMBURGER_BUTTON = "TOGGLE_HAMBURGER_BUTTON";
export const TOGGLE_LOADING = "TOGGLE_LOADING";

interface UpdateCategoriesAction {
  type: typeof UPDATE_CATEGORIES;
  payload: Array<Category>;
}

interface ToggleHamburgerButtonAction {
  type: typeof TOGGLE_HAMBURGER_BUTTON;
  payload: Boolean;
}

interface ToggleLoadingAction {
  type: typeof TOGGLE_LOADING;
  payload: Boolean;
}

export type CommonAction =
  | UpdateCategoriesAction
  | ToggleHamburgerButtonAction
  | ToggleLoadingAction;

export type CommonState = {
  categories: Array<Category>;
  isMenuOpen: Boolean;
  loading: Boolean;
};
