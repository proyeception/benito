import { Category } from "../../types";
import { UPDATE_CATEGORIES, CommonAction } from "../../store/common/types";

export function updateCategories(categories: Array<Category>): CommonAction {
  return {
    type: UPDATE_CATEGORIES,
    payload: categories,
  };
}
