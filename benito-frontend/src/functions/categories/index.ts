import store from "../../store";
import { Category } from "../../types";

export function fromCategoryTagName(s?: string): Category | undefined {
  return store.getState().common.categories.find((c) => c.tagName == s);
}

export function fromCategoryName(s: string): Category | undefined {
  return store.getState().common.categories.find((c) => c.name == s);
}
