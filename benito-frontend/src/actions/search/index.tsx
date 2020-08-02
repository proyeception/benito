import {
  SearchAction,
  UPDATE_NAME,
  UPDATE_CATEGORY,
  UPDATE_PROJECTS,
  UPDATE_FROM_DATE,
  UPDATE_TO_DATE,
  UPDATE_KEYWORD,
  UPDATE_DOCUMENTATION,
  UPDATE_SORT_METHOD,
  SortMethod
} from "../../store/search/types";
import { Project } from "../../components/Search/ProjectSummary";

export function updateName(name: String): SearchAction {
  return {
    type: UPDATE_NAME,
    payload: name,
  };
}

export function updateCategory(category: String): SearchAction {
  return {
    type: UPDATE_CATEGORY,
    payload: category,
  };
}

export function updateProjects(projects: Array<Project>): SearchAction {
  return {
    type: UPDATE_PROJECTS,
    payload: projects,
  };
}

export function updateFromDate(fromDate: String): SearchAction {
  return {
    type: UPDATE_FROM_DATE,
    payload: fromDate,
  };
}

export function updateToDate(toDate: String): SearchAction {
  return {
    type: UPDATE_TO_DATE,
    payload: toDate,
  };
}

export function updateKeyword(keyword: String): SearchAction {
  return {
    type: UPDATE_KEYWORD,
    payload: keyword,
  };
}

export function updateDocumentation(documentation: String): SearchAction {
  return {
    type: UPDATE_DOCUMENTATION,
    payload: documentation,
  };
}

export function updateSortMethod(sortMethod: SortMethod): SearchAction {
  return {
    type: UPDATE_SORT_METHOD,
    payload: sortMethod,
  };
}