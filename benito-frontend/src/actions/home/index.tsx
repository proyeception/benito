import { Project, Category } from "../../types";
import {
  HomeAction,
  UPDATE_FEATURED_PROJECTS,
  UPDATE_CATEGORIES,
  UPDATE_LATEST_PROJECTS,
} from "../../store/home/types";

export function updateFeaturedProjects(projects: Array<Project>): HomeAction {
  return {
    type: UPDATE_FEATURED_PROJECTS,
    payload: projects,
  };
}

export function updateLatestProjects(projects: Array<Project>): HomeAction {
  return {
    type: UPDATE_LATEST_PROJECTS,
    payload: projects,
  };
}

export function updateCategories(categories: Array<Category>): HomeAction {
  return {
    type: UPDATE_CATEGORIES,
    payload: categories,
  };
}
