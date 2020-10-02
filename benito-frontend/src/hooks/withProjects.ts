import { buildQueryParams } from "../functions/search";
import { Project, SearchParams } from "../types";
import withFetch, { FetchStatus } from "./withFetch";

type Refresh = (params: SearchParams) => void;

const withProjects = (
  params: SearchParams,
  cb?: () => void
): [FetchStatus<Array<Project>>, Refresh] => {
  const [projects, refresh] = withFetch<Array<Project>>(
    `projects${buildQueryParams(params)}`,
    cb
  );

  const refreshWithParams = (params: SearchParams) =>
    refresh(`projects${buildQueryParams(params)}`);

  return [projects, refreshWithParams];
};

export default withProjects;
