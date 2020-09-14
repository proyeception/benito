import { Project, Role, Person } from "../../types";
import store from "../../store";
import {
  setProjectAuthor,
  setProjectVisitor,
  setProjectSupervisor,
} from "../../actions/project";
import { benitoHost } from "../../config";
import axios, { AxiosRequestConfig } from "axios";
import { signRequest } from "../http";

export function setProjectEditionRole({
  project,
  userId,
  role,
}: {
  project: Project;
  userId?: String;
  role?: Role;
}) {
  if (
    userId &&
    role == "AUTHOR" &&
    project.authors.some((a) => a.id == userId)
  ) {
    store.dispatch(setProjectAuthor());
  } else if (
    userId &&
    role == "SUPERVISOR" &&
    project.supervisors.some((s) => s.id == userId)
  ) {
    store.dispatch(setProjectSupervisor());
  } else {
    store.dispatch(setProjectVisitor());
  }
}

export function updateContent(
  title: String,
  description: String,
  extraContent: String,
  posterUrl: String,
  projectId: String
) {
  let config: AxiosRequestConfig = {
    url: `${benitoHost}/benito/projects/${projectId}/content`,
    data: {
      title: title,
      description: description,
      extraContent: extraContent,
      posterUrl: posterUrl,
    },
    method: "PATCH",
  };

  return axios.request(signRequest(config));
}

export function addUsersToProject(
  authors: Array<Person>,
  projectId: String,
  userType: "authors" | "supervisors"
) {
  let config: AxiosRequestConfig = {
    url: `${benitoHost}/benito/projects/${projectId}/${userType}`,
    data: {
      items: authors.map((a) => a.id),
    },
    method: "POST",
  };

  return axios.request(signRequest(config));
}

export function setProjectUsers(
  authors: Array<Person>,
  supervisors: Array<Person>,
  projectId: String
) {
  let config: AxiosRequestConfig = {
    url: `${benitoHost}/benito/projects/${projectId}/users`,
    data: {
      authors: authors.map((a) => a.id),
      supervisors: supervisors.map((s) => s.id),
    },
    method: "PUT",
  };

  return axios.request(signRequest(config));
}
