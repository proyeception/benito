import axios, { AxiosRequestConfig } from "axios";
import { benitoHost } from "../../config";
import { Person, UpdateUser, Role } from "../../types";
import { signRequest } from "../http";

export async function fetchUser(collection: String, userId: String) {
  let config: AxiosRequestConfig = {
    method: "GET",
    url: `${benitoHost}/benito/${collection}/${userId}`,
  };

  return axios.request<Person>(config).then((res) => res.data);
}

export function mapRoleToCollection(role: Role): "authors" | "supervisors" {
  switch (role) {
    case "SUPERVISOR": {
      return "supervisors";
    }
    case "AUTHOR": {
      return "authors";
    }
  }
}

export async function updateUser(
  collection: String,
  userId: String,
  user: UpdateUser
) {
  let config: AxiosRequestConfig = {
    method: "PATCH",
    url: `${benitoHost}/benito/${collection}/${userId}`,
    data: user,
  };

  return axios.request(signRequest(config));
}
