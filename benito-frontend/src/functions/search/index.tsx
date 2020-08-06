import axios, { AxiosRequestConfig, AxiosPromise } from "axios";
import { benitoHost } from "../../config";
import { Project } from "../../types";

interface Params {
  name?: String;
  category?: String;
  fromDate?: String;
  toDate?: String;
  keyword?: String;
  documentation?: String;
  sortMethod?: String;
}

export function fetchProjects(
  params: Params = {}
): AxiosPromise<Array<Project>> {
  let config: AxiosRequestConfig = {
    method: "GET",
    url: `${benitoHost}/benito/projects${buildQueryParams(params)}`,
  };

  return axios.request<Array<Project>>(config);
}

function buildQueryParams({
  name,
  category,
  fromDate,
  toDate,
  sortMethod,
}: Params) {
  return "?"
    .concat(buildQueryParamProperty("name", name))
    .concat(buildQueryParamProperty("category", category))
    .concat(buildQueryParamProperty("from", fromDate))
    .concat(buildQueryParamProperty("to", toDate))
    .concat(buildQueryParamProperty("orderBy", sortMethod))
    .slice(0, -1);
  //TODO
  //params = params.concat(this.buildQueryParamProperty("keyword", this.state.keyword))
  //params = params.concat(this.buildQueryParamProperty("documentation", this.state.documentation))
}

function buildQueryParamProperty(key: String, value: String) {
  return value ? key + "=" + value + "&" : "";
}
