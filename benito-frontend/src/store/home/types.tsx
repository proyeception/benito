import { Project, Category } from "../../types";

export const UPDATE_FEATURED_PROJECTS = "UPDATE_FEATURED_PROJECTS";
export const UPDATE_LATEST_PROJECTS = "UPDATE_LATEST_PROJECTS";
export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";

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

export type HomeAction =
  | UpdateFeaturedProjectsAction
  | UpdateCategoriesAction
  | UpdateLatestProjectsAction;

export type HomeState = {
  featuredProjects: Array<Project>;
  latestProjects: Array<Project>;
  categories: Array<Category>;
};
