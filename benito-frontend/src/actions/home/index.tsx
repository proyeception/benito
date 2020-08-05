import { Project } from "../../types";
import {
  HomeAction,
  UPDATE_FEATURED_PROJECTS,
  UPDATE_LATEST_PROJECTS,
  UPDATE_PROJECT_TOTAL,
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

export function updateProjectTotal(total: Number): HomeAction {
  return {
    type: UPDATE_PROJECT_TOTAL,
    payload: total,
  };
}
