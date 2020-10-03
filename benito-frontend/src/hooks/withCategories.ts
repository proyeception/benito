import { Category } from "../types";
import withFetch, { FetchStatus } from "./withFetch";

const withCategories = (): FetchStatus<Array<Category>> => {
  const [project] = withFetch<Array<Category>>("categories");
  return project;
};

export default withCategories;
