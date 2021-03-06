import {
  Project,
  Role,
  Person,
  OrganizationQuantityType,
  ProjectCreationTimelineType,
  CategoryQuantityType,
  TopProject,
} from "../../types";
import { benitoHost } from "../../config";
import axios, { AxiosRequestConfig, AxiosPromise } from "axios";
import { signRequest } from "../http";
import store from "../../store";
import {
  setProjectAuthor,
  setProjectSupervisor,
  setProjectVisitor,
} from "../../actions/project";

export function setProjectEditionRole({
  project,
  userId,
  role,
}: {
  project: Project;
  userId?: string;
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
  projectId: string,
  documents: Array<String>,
  title?: string,
  description?: string,
  extraContent?: string
) {
  let config: AxiosRequestConfig = {
    url: `${benitoHost}/benito/projects/${projectId}/content`,
    data: {
      title: title,
      description: description,
      extraContent: extraContent,
      documentation: documents,
    },
    method: "PATCH",
  };

  return axios.request(signRequest(config));
}

export function createProject(
  title: string,
  category: string,
  organization: string,
  creationDate: string
): AxiosPromise<Project> {
  let newProject: AxiosRequestConfig = {
    url: `${benitoHost}/benito/projects`,
    method: "POST",
    data: {
      title: title,
      categoryId: category,
      organizationId: organization,
      creationDate: creationDate,
    },
  };
  return axios.request<Project>(signRequest(newProject));
}

export function updatePicture(projectId: string, picture: File) {
  const pictureForm = new FormData();
  pictureForm.set("file", picture);

  let pictureConfig: AxiosRequestConfig = {
    url: `${benitoHost}/benito/projects/${projectId}/picture`,
    method: "POST",
    data: pictureForm,
  };

  return axios.request(signRequest(pictureConfig));
}

export function updateTags(projectId: string, tags: Array<string>) {
  let pictureConfig: AxiosRequestConfig = {
    url: `${benitoHost}/benito/projects/${projectId}/tags`,
    method: "POST",
    data: { tags },
  };

  return axios.request(signRequest(pictureConfig));
}

export function uploadDocuments(projectId: string, documents: Array<File>) {
  const form = new FormData();
  documents.forEach((f: File) => form.append("file", f, f.name));

  let documentsConfig: AxiosRequestConfig = {
    url: `${benitoHost}/benito/projects/${projectId}/documents`,
    method: "POST",
    data: form,
  };

  return axios.request(signRequest(documentsConfig));
}

export function addUsersToProject(
  authors: Array<Person>,
  projectId: string,
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
  projectId: string
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

export function generateTagsFromText(text: string) {
  let config: AxiosRequestConfig = {
    url: `${benitoHost}/benito/tags`,
    data: {
      text,
    },
    method: "POST",
  };

  return axios.request(signRequest(config));
}

export function generatePdfUrl(file: File) {
  const pictureForm = new FormData();
  pictureForm.set("file", file);

  let pictureConfig: AxiosRequestConfig = {
    url: `${benitoHost}/benito/pdf-to-image`,
    method: "POST",
    data: pictureForm,
  };

  return axios.request(signRequest(pictureConfig));
}

export function closeProject(projectId: string) {
  let config: AxiosRequestConfig = {
    url: `${benitoHost}/benito/projects/${projectId}/close`,
    method: "POST",
  };

  return axios.request(signRequest(config));
}

export function updateProjectxQuantity(
  id: string
): AxiosPromise<Array<OrganizationQuantityType>> {
  let queryParams = "";
  if (id != "") {
    queryParams = "?categoryId=" + id;
  }
  let results: AxiosRequestConfig = {
    url: `${benitoHost}/benito/stats/projectsxorganization${queryParams}`,
    method: "GET",
  };
  return axios.request<Array<OrganizationQuantityType>>(signRequest(results));
}

export function updateCategoryxQuantity(
  id: string
): AxiosPromise<Array<CategoryQuantityType>> {
  let queryParams = "";
  if (id != "") {
    queryParams = "?organizationId=" + id;
  }
  let results: AxiosRequestConfig = {
    url: `${benitoHost}/benito/stats/projectsxcategory${queryParams}`,
    method: "GET",
  };
  return axios.request<Array<CategoryQuantityType>>(signRequest(results));
}

export function updateProjectCreationTimeline(
  ids: Array<string>,
  startYear: number | null | undefined,
  endYear: number | null | undefined
): AxiosPromise<Array<ProjectCreationTimelineType>> {
  let queryParams = "?";
  if (ids.length != 0) {
    queryParams = queryParams + "categoryIds=" + ids.join(",") + "&";
  }
  if (startYear != null) {
    queryParams = queryParams + "since=" + startYear + "&";
  }
  if (endYear != null) {
    queryParams = queryParams + "to=" + endYear + "&";
  }
  queryParams = queryParams.slice(0, -1);

  let results: AxiosRequestConfig = {
    url: `${benitoHost}/benito/stats/projectsxcategoryxyear${queryParams}`,
    method: "GET",
  };
  return axios.request<Array<ProjectCreationTimelineType>>(
    signRequest(results)
  );
}

export function updateTopProjects(
  categoryId: string | null,
  organizationId: string | null,
  year: number | null | undefined
): AxiosPromise<Array<TopProject>> {
  let queryParams = "?";
  if (categoryId != null) {
    queryParams = queryParams + "categoryId=" + categoryId + "&";
  }
  if (organizationId != null) {
    queryParams = queryParams + "organizationId=" + organizationId + "&";
  }
  if (year != null) {
    queryParams = queryParams + "year=" + year + "&";
  }
  queryParams = queryParams.slice(0, -1);

  let results: AxiosRequestConfig = {
    url: `${benitoHost}/benito/stats/topprojects${queryParams}`,
    method: "GET",
  };
  return axios.request<Array<TopProject>>(signRequest(results));
}
