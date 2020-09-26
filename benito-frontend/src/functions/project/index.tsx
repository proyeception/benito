import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios";
import { benitoHost } from "../../config";
import { Project } from "../../types";

export async function findById(projectId: String) {
  let config: AxiosRequestConfig = {
    method: "GET",
    url: `${benitoHost}/benito/projects/${projectId}`,
  };

  return axios.request<Project>(config).then((res) => res.data);
}
