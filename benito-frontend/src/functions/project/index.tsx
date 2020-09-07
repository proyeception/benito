import { Project, Role } from "../../types";
import store from "../../store";
import { setProjectAuthor, setProjectVisitor } from "../../actions/project";
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
  } else {
    store.dispatch(setProjectVisitor());
  }
}

export function updateContent(
  title: String,
  description: String,
  extraContent: String,
  projectId: String
) {
  let config: AxiosRequestConfig = {
    url: `${benitoHost}/benito/projects/${projectId}/content`,
    data: {
      title: title,
      description: description,
      extraContent: extraContent,
    },
    method: "PATCH",
  };

  return axios.request(signRequest(config));
}
