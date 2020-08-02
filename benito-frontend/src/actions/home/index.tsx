import { Project, Category } from "../../types";
import {
  HomeAction,
  UPDATE_FEATURED_PROJECTS,
  UPDATE_CATEGORIES,
} from "../../store/home/types";

export function updateFeaturedProjects(projects: Array<Project>): HomeAction {
  return {
    type: UPDATE_FEATURED_PROJECTS,
    payload: projects,
  };
}

export function updateCategories(categories: Array<Category>): HomeAction {
  return {
    type: UPDATE_CATEGORIES,
    payload: categories,
  };
}
