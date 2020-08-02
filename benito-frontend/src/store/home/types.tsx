import { Project, Category } from "../../types";

export const UPDATE_FEATURED_PROJECTS = "UPDATE_FEATURED_PROJECTS";
export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";

interface UpdateFeaturedProjectsAction {
  type: typeof UPDATE_FEATURED_PROJECTS;
  payload: Array<Project>;
}

interface UpdateCategoriesAction {
  type: typeof UPDATE_CATEGORIES;
  payload: Array<Category>;
}

export type HomeAction = UpdateFeaturedProjectsAction | UpdateCategoriesAction;

export type HomeState = {
  featuredProjects: Array<Project>;
  categories: Array<Category>;
};
