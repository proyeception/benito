import { buildQueryParams } from "../functions/search";
import { Project, SearchParams } from "../types";
import withFetch, { FetchStatus } from "./withFetch";

type Refresh = (params: SearchParams) => void;

type Search = {
  projects: Array<Project>,
  count: number,
}

const withProjects = (
  params: SearchParams,
  cb?: (s: Search) => void
): [FetchStatus<Search>, Refresh] => {
  const [search, refresh] = withFetch<Search>(
    `projects${buildQueryParams(params)}`,
    cb
  );

  const refreshWithParams = (params: SearchParams) =>
    refresh(`projects${buildQueryParams(params)}`);

  return [search, refreshWithParams];
};

export default withProjects;
