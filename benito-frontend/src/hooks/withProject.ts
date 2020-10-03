import { Project } from "../types";
import withFetch, { FetchStatus } from "./withFetch";

const withProject = (projectId: string): FetchStatus<Project> => {
  const [project] = withFetch<Project>(`projects/${projectId}`);
  return project;
};

export default withProject;
