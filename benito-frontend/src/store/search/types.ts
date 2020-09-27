import { Category, Project, SearchParams, SortMethod } from "../../types";

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
export const UPDATE_SEARCH_PARAMS = "UPDATE_SEARCH_PARAMS";
export const UPDATE_FETCH_STATUS = "UPDATE_FETCH_STATUS";

interface UpdateTitleAction {
  type: typeof UPDATE_TITLE;
  payload: string;
}

interface UpdateFromDateAction {
  type: typeof UPDATE_FROM_DATE;
  payload: Date;
}

interface UpdateToDateAction {
  type: typeof UPDATE_TO_DATE;
  payload: Date;
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

interface UpdateSearchParamsAction {
  type: typeof UPDATE_SEARCH_PARAMS;
  payload: SearchState;
}

interface UpdateFetchStatusAction {
  type: typeof UPDATE_FETCH_STATUS;
  payload: Fetch;
}

export const NOTHING = "NOTHING";
export const REFRESH = "REFRESH";

export type Fetch = typeof NOTHING | typeof REFRESH;

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
  | UpdateOrganization
  | UpdateSearchParamsAction
  | UpdateFetchStatusAction;

export type SearchState = {
  title?: string;
  category?: Category;
  fromDate?: Date;
  toDate?: Date;
  keyword?: string;
  documentation?: string;
  orderBy: SortMethod;
  organization?: string;
  status: Fetch;
};
