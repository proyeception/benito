import { buildQueryParams } from "../functions/search";
import { Project, SearchParams } from "../types";
import withFetch, { FetchStatus } from "./withFetch";

const withProjects = (params: SearchParams): FetchStatus<Array<Project>> =>
  withFetch<Array<Project>>(`projects?${buildQueryParams(params)}`);

export default withProjects;
