import { Project } from "../../types";
import { HomeAction, UPDATE_REMARKABLE_PROJECTS } from "../../store/home/types";

export function updateRemarkableProjects(projects: Array<Project>): HomeAction {
  return {
    type: UPDATE_REMARKABLE_PROJECTS,
    payload: projects,
  };
}
