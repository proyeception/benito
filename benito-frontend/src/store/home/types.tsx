import { Project } from "../../types";

export const UPDATE_REMARKABLE_PROJECTS = "UPDATE_REMARKABLE_PROJECTS";

interface UpdatefeaturedProjects {
  type: typeof UPDATE_REMARKABLE_PROJECTS;
  payload: Array<Project>;
}

export type HomeAction = UpdatefeaturedProjects;

export type HomeState = {
  featuredProjects: Array<Project>;
};
