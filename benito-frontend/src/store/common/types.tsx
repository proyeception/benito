import { Category } from "../../types";

export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
export const TOGGLE_HAMBURGER_BUTTON = "TOGGLE_HAMBURGER_BUTTON";

interface UpdateCategoriesAction {
  type: typeof UPDATE_CATEGORIES;
  payload: Array<Category>;
}

interface ToggleHamburgerButtonAction {
  type: typeof TOGGLE_HAMBURGER_BUTTON;
  payload: Boolean;
}

export type CommonAction = UpdateCategoriesAction | ToggleHamburgerButtonAction;

export type CommonState = {
  categories: Array<Category>;
  isMenuOpen: Boolean;
};
