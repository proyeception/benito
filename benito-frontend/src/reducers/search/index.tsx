import {
  SearchAction,
  SearchState,
  UPDATE_TITLE,
  UPDATE_CATEGORY,
  UPDATE_PROJECTS,
  UPDATE_FROM_DATE,
  UPDATE_TO_DATE,
  UPDATE_KEYWORD,
  UPDATE_DOCUMENTATION,
  UPDATE_SORT_METHOD,
  RESET_SEARCH_PARAMETERS,
  UPDATE_ORGANIZATION,
} from "../../store/search/types";
import { SortMethod } from "../../types";

const defaultSearchState: SearchState = {
  title: "",
  category: null,
  projects: [],
  fromDate: "",
  toDate: "",
  keyword: "",
  documentation: "",
  orderBy: SortMethod.DateDesc,
  organization: "",
};

function searchReducer(
  state = defaultSearchState,
  action: SearchAction
): SearchState {
  switch (action.type) {
    case UPDATE_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    case UPDATE_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case UPDATE_FROM_DATE:
      return {
        ...state,
        fromDate: action.payload,
      };
    case UPDATE_TO_DATE:
      return {
        ...state,
        toDate: action.payload,
      };
    case UPDATE_KEYWORD:
      return {
        ...state,
        keyword: action.payload,
      };
    case UPDATE_DOCUMENTATION:
      return {
        ...state,
        documentation: action.payload,
      };
    case UPDATE_SORT_METHOD:
      return {
        ...state,
        orderBy: action.payload,
      };
    case RESET_SEARCH_PARAMETERS:
      return {
        ...defaultSearchState,
      };
    case UPDATE_ORGANIZATION:
      return {
        ...state,
        organization: action.payload,
      };
    default:
      return state;
  }
}

export default searchReducer;
