import { Category } from "../../types";
import store from "../../store";

export function categoryOf(tagName: String): Category {
  return store.getState().common.categories.find((c) => c.tagName == tagName);
}
