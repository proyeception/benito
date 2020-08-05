import { Category } from "../../types";

export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";

interface UpdateCategoriesAction {
  type: typeof UPDATE_CATEGORIES;
  payload: Array<Category>;
}

export type CommonAction = UpdateCategoriesAction;

export type CommonState = {
  categories: Array<Category>;
};
