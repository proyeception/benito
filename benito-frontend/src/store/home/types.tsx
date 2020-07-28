import { Project } from "../../types";

export const UPDATE_REMARKABLE_PROJECTS = "UPDATE_REMARKABLE_PROJECTS";

interface UpdateRemarkableProjects {
  type: typeof UPDATE_REMARKABLE_PROJECTS;
  payload: Array<Project>;
}

export type HomeAction = UpdateRemarkableProjects;

export type HomeState = {
  remarkableProjects: Array<Project>;
};
