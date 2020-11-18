import { Category, Organization } from "../../types";

export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
export const UPDATE_ORGANIZATIONS = "UPDATE_ORGANIZATIONS";
export const TOGGLE_HAMBURGER_BUTTON = "TOGGLE_HAMBURGER_BUTTON";
export const TOGGLE_LOADING = "TOGGLE_LOADING";
export const UPDATE_CUSTOMIZATION_TOKEN = "UPDATE_CUSTOMIZATION_TOKEN";

interface UpdateCustomizationTokenAction {
  type: typeof UPDATE_CUSTOMIZATION_TOKEN;
  payload: string;
}

interface UpdateCategoriesAction {
  type: typeof UPDATE_CATEGORIES;
  payload: Array<Category>;
}

interface ToggleHamburgerButtonAction {
  type: typeof TOGGLE_HAMBURGER_BUTTON;
  payload: boolean;
}

interface ToggleLoadingAction {
  type: typeof TOGGLE_LOADING;
  payload: boolean;
}

interface UpdateOrganizationsAction {
  type: typeof UPDATE_ORGANIZATIONS;
  payload: Array<Organization>;
}

export type CommonAction =
  | UpdateCategoriesAction
  | ToggleHamburgerButtonAction
  | ToggleLoadingAction
  | UpdateOrganizationsAction
  | UpdateCustomizationTokenAction;

export type CommonState = {
  categories: Array<Category>;
  isMenuOpen: boolean;
  loading: boolean;
  organizations: Array<Organization>;
  customizationToken?: string;
};
