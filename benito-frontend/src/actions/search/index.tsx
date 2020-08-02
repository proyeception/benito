import {
  SearchAction,
  UPDATE_NAME,
  UPDATE_CATEGORY,
  UPDATE_PROJECTS,
} from "../../store/search/types";
import { Project } from "../../components/Search/ProjectSummary";

export function updateName(name: String): SearchAction {
  return {
    type: UPDATE_NAME,
    payload: name,
  };
}

export function updateCategory(category: String): SearchAction {
  return {
    type: UPDATE_CATEGORY,
    payload: category,
  };
}

export function updateProjects(projects: Array<Project>): SearchAction {
  return {
    type: UPDATE_PROJECTS,
    payload: projects,
  };
}
