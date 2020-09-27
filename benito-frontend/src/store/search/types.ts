import { Category, Project, SortMethod } from "../../types";

export const UPDATE_TITLE = "UPDATE_TITLE";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const UPDATE_FROM_DATE = "UPDATE_FROM_DATE";
export const UPDATE_TO_DATE = "UPDATE_TO_DATE";
export const UPDATE_KEYWORD = "UPDATE_KEYWORD";
export const UPDATE_DOCUMENTATION = "UPDATE_DOCUMENTATION";
export const UPDATE_PROJECTS = "UPDATE_PROJECTS";
export const UPDATE_SORT_METHOD = "UPDATE_SORT_METHOD";
export const RESET_SEARCH_PARAMETERS = "RESET_SEARCH_PARAMETERS";
export const UPDATE_ORGANIZATION = "UPDATE_ORGANIZATION";

interface UpdateTitleAction {
  type: typeof UPDATE_TITLE;
  payload: string;
}

interface UpdateFromDateAction {
  type: typeof UPDATE_FROM_DATE;
  payload: string;
}

interface UpdateToDateAction {
  type: typeof UPDATE_TO_DATE;
  payload: string;
}

interface UpdateKeywordAction {
  type: typeof UPDATE_KEYWORD;
  payload: string;
}

interface UpdateDocumentationAction {
  type: typeof UPDATE_DOCUMENTATION;
  payload: string;
}

interface UpdateCategoryAction {
  type: typeof UPDATE_CATEGORY;
  payload: Category;
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
  payload: string;
}
export type SearchAction =
  | UpdateTitleAction
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
  title: string;
  projects: Array<Project>;
  category: Category | null;
  fromDate: string;
  toDate: string;
  keyword: string;
  documentation: string;
  orderBy: SortMethod;
  organization: string;
};
