import { Category, Organization } from "../../types";
import {
  UPDATE_CATEGORIES,
  CommonAction,
  TOGGLE_HAMBURGER_BUTTON,
  TOGGLE_LOADING,
  UPDATE_ORGANIZATIONS,
  UPDATE_CUSTOMIZATION_TOKEN,
} from "../../store/common/types";

export function updateCategories(categories: Array<Category>): CommonAction {
  return {
    type: UPDATE_CATEGORIES,
    payload: categories,
  };
}

export function toggleHamburgerButton(b: boolean): CommonAction {
  return {
    type: TOGGLE_HAMBURGER_BUTTON,
    payload: b,
  };
}

export function toggleLoading(b: boolean): CommonAction {
  return {
    type: TOGGLE_LOADING,
    payload: b,
  };
}

export function updateOrganizations(orgs: Array<Organization>): CommonAction {
  return {
    type: UPDATE_ORGANIZATIONS,
    payload: orgs,
  };
}

export function updateCustomizationToken(token: string): CommonAction {
  return {
    type: UPDATE_CUSTOMIZATION_TOKEN,
    payload: token,
  };
}
