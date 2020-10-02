import { Category, Organization } from "../../types";

export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
export const UPDATE_ORGANIZATIONS = "UPDATE_ORGANIZATIONS";
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

interface UpdateOrganizationsAction {
  type: typeof UPDATE_ORGANIZATIONS;
  payload: Array<Organization>;
}

export type CommonAction =
  | UpdateCategoriesAction
  | ToggleHamburgerButtonAction
  | ToggleLoadingAction
  | UpdateOrganizationsAction;

export type CommonState = {
  categories: Array<Category>;
  isMenuOpen: Boolean;
  loading: Boolean;
  organizations: Array<Organization>;
};
