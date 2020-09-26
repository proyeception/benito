import { Project } from "../types";
import withFetch, { FetchStatus } from "./withFetch";

const withProject = (projectId: String): FetchStatus<Project> =>
  withFetch(`projects/${projectId}`);

export default withProject;
