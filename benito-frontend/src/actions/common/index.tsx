import { Category } from "../../types";
import {
  UPDATE_CATEGORIES,
  CommonAction,
  TOGGLE_HAMBURGER_BUTTON,
} from "../../store/common/types";

export function updateCategories(categories: Array<Category>): CommonAction {
  return {
    type: UPDATE_CATEGORIES,
    payload: categories,
  };
}

export function toggleHamburgerButton(b: Boolean): CommonAction {
  return {
    type: TOGGLE_HAMBURGER_BUTTON,
    payload: b,
  };
}
