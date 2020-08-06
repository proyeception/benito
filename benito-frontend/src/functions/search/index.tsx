import axios, { AxiosRequestConfig, AxiosPromise } from "axios";
import { benitoHost } from "../../config";
import { Project } from "../../types";

export function fetchProjects(): AxiosPromise<Array<Project>> {
  let config: AxiosRequestConfig = {
    method: "GET",
    url: `${benitoHost}/benito/projects`,
  };

  return axios.request<Array<Project>>(config);
}
