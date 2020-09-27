import { Category } from "../types";
import withFetch, { FetchStatus } from "./withFetch";

const withCategories = (): FetchStatus<Array<Category>> =>
  withFetch("categories");

export default withCategories;
