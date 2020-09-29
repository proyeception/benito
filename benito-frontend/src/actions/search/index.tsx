import {
  SearchAction,
  UPDATE_TITLE,
  UPDATE_CATEGORY,
  UPDATE_PROJECTS,
  UPDATE_FROM_DATE,
  UPDATE_TO_DATE,
  UPDATE_KEYWORD,
  UPDATE_DOCUMENTATION,
  UPDATE_SORT_METHOD,
  RESET_SEARCH_PARAMETERS,
  UPDATE_SEARCH_PARAMS,
  SearchState,
  Fetch,
  UPDATE_FETCH_STATUS,
  UPDATE_ORGANIZATION,
} from "../../store/search/types";
import { Category, Organization, SortMethod } from "../../types";

export function updateTitle(name: string): SearchAction {
  return {
    type: UPDATE_TITLE,
    payload: name,
  };
}

export function updateCategory(category: Category): SearchAction {
  return {
    type: UPDATE_CATEGORY,
    payload: category,
  };
}

export function updateFromDate(fromDate: Date): SearchAction {
  return {
    type: UPDATE_FROM_DATE,
    payload: fromDate,
  };
}

export function updateToDate(toDate: Date): SearchAction {
  return {
    type: UPDATE_TO_DATE,
    payload: toDate,
  };
}

export function updateKeyword(keyword: string): SearchAction {
  return {
    type: UPDATE_KEYWORD,
    payload: keyword,
  };
}

export function updateDocumentation(documentation: string): SearchAction {
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

export function emptyProjects(): SearchAction {
  return {
    type: UPDATE_PROJECTS,
    payload: [],
  };
}

export function updateSearchParams(searchParams: SearchState): SearchAction {
  return {
    type: UPDATE_SEARCH_PARAMS,
    payload: searchParams,
  };
}

export function resetSearchParameters(): SearchAction {
  return {
    type: RESET_SEARCH_PARAMETERS,
  };
}

export function updateFetchStatus(fetch: Fetch): SearchAction {
  return {
    type: UPDATE_FETCH_STATUS,
    payload: fetch,
  };
}

export function updateOrganization(o: Organization): SearchAction {
  return {
    type: UPDATE_ORGANIZATION,
    payload: o,
  };
}
