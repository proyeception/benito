import { Project } from "../../types";

export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const UPDATE_FROM_DATE = "UPDATE_FROM_DATE";
export const UPDATE_TO_DATE = "UPDATE_TO_DATE";
export const UPDATE_KEYWORD = "UPDATE_KEYWORD";
export const UPDATE_DOCUMENTATION = "UPDATE_DOCUMENTATION";
export const UPDATE_PROJECTS = "UPDATE_PROJECTS";
export const UPDATE_SORT_METHOD = "UPDATE_SORT_METHOD";
export const RESET_SEARCH_PARAMETERS = "RESET_SEARCH_PARAMETERS";
export const UPDATE_ORGANIZATION = "UPDATE_ORGANIZATION";

interface UpdateNameAction {
  type: typeof UPDATE_NAME;
  payload: String;
}

interface UpdateFromDateAction {
  type: typeof UPDATE_FROM_DATE;
  payload: String;
}

interface UpdateToDateAction {
  type: typeof UPDATE_TO_DATE;
  payload: String;
}

interface UpdateKeywordAction {
  type: typeof UPDATE_KEYWORD;
  payload: String;
}

interface UpdateDocumentationAction {
  type: typeof UPDATE_DOCUMENTATION;
  payload: String;
}

interface UpdateCategoryAction {
  type: typeof UPDATE_CATEGORY;
  payload: String;
}

interface UpdateProjects {
  type: typeof UPDATE_PROJECTS;
  payload: Array<Project>;
}

interface UpdateSortMethod {
  type: typeof UPDATE_SORT_METHOD;
  payload: SortMethod;
}

interface ResetSearchParametersAction {
  type: typeof RESET_SEARCH_PARAMETERS;
}

interface UpdateOrganization {
  type: typeof UPDATE_ORGANIZATION;
  payload: String;
}

export enum SortMethod {
  DateAsc = "DATE_ASC",
  DateDesc = "DATE_DESC",
  AlphaAsc = "ALPHA_ASC",
  AlphaDesc = "ALPHA_DESC",
}

export type SearchAction =
  | UpdateNameAction
  | UpdateCategoryAction
  | UpdateProjects
  | UpdateFromDateAction
  | UpdateToDateAction
  | UpdateKeywordAction
  | UpdateDocumentationAction
  | UpdateSortMethod
  | ResetSearchParametersAction
  | UpdateOrganization;

export type SearchState = {
  name: String;
  projects: Array<Project>;
  category: String;
  fromDate: String;
  toDate: String;
  keyword: String;
  documentation: String;
  sortMethod: SortMethod;
  organization: String;
};
