import { Project } from "../types";
import withFetch, { FetchStatus } from "./withFetch";

const withProject = (
  projectId: string,
  andThen?: (p: Project) => void
): FetchStatus<Project> => {
  const [project] = withFetch<Project>(`projects/${projectId}`, andThen);
  return project;
};

export default withProject;
