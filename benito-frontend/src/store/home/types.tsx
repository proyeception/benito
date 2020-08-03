import { Project, Category } from "../../types";

export const UPDATE_FEATURED_PROJECTS = "UPDATE_FEATURED_PROJECTS";
export const UPDATE_LATEST_PROJECTS = "UPDATE_LATEST_PROJECTS";
export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
export const UPDATE_PROJECT_TOTAL = "UPDATE_PROJECT_TOTAL";

interface UpdateFeaturedProjectsAction {
  type: typeof UPDATE_FEATURED_PROJECTS;
  payload: Array<Project>;
}

interface UpdateLatestProjectsAction {
  type: typeof UPDATE_LATEST_PROJECTS;
  payload: Array<Project>;
}

interface UpdateCategoriesAction {
  type: typeof UPDATE_CATEGORIES;
  payload: Array<Category>;
}

interface UpdateProjectTotalAction {
  type: typeof UPDATE_PROJECT_TOTAL;
  payload: Number;
}

export type HomeAction =
  | UpdateFeaturedProjectsAction
  | UpdateCategoriesAction
  | UpdateLatestProjectsAction
  | UpdateProjectTotalAction;

export type HomeState = {
  featuredProjects: Array<Project>;
  latestProjects: Array<Project>;
  categories: Array<Category>;
  projectTotal: Number;
};
