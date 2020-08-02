import { Project } from "../../types";

export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const UPDATE_PROJECTS = "UPDATE_PROJECTS";

interface UpdateNameAction {
  type: typeof UPDATE_NAME;
  payload: String;
}

interface UpdateCategoryAction {
  type: typeof UPDATE_CATEGORY;
  payload: String;
}

interface UpdateProjects {
  type: typeof UPDATE_PROJECTS;
  payload: Array<Project>;
}

export type SearchAction =
  | UpdateNameAction
  | UpdateCategoryAction
  | UpdateProjects;

export type SearchState = {
  name: String;
  category: String;
  projects: Array<Project>;
};
