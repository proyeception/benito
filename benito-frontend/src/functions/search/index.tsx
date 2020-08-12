import axios, { AxiosRequestConfig, AxiosPromise } from "axios";
import { benitoHost } from "../../config";
import { Project } from "../../types";
import store from "../../store";

interface Params {
  name?: String;
  category?: String;
  fromDate?: String;
  toDate?: String;
  keyword?: String;
  documentation?: String;
  sortMethod?: String;
}

export function fetchProjects(): AxiosPromise<Array<Project>> {
  let params = store.getState().search;
  let config: AxiosRequestConfig = {
    url: `${benitoHost}/benito/projects${buildQueryParams(params)}`,
  };

  return axios.request<Array<Project>>(config);
}

export function buildQueryParams({
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
