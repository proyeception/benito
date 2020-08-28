import {
  SearchAction,
  SearchState,
  UPDATE_NAME,
  UPDATE_CATEGORY,
  UPDATE_PROJECTS,
  UPDATE_FROM_DATE,
  UPDATE_TO_DATE,
  UPDATE_KEYWORD,
  UPDATE_DOCUMENTATION,
  SortMethod,
  UPDATE_SORT_METHOD,
  RESET_SEARCH_PARAMETERS,
  UPDATE_ORGANIZATION,
} from "../../store/search/types";

const defaultSearchState: SearchState = {
  name: "",
  category: "",
  projects: [],
  fromDate: "",
  toDate: "",
  keyword: "",
  documentation: "",
  sortMethod: SortMethod.DateDesc,
  organization: "",
};

function searchReducer(
  state = defaultSearchState,
  action: SearchAction
): SearchState {
  switch (action.type) {
    case UPDATE_NAME:
      return {
        ...state,
        name: action.payload,
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
        sortMethod: action.payload,
      };
    case RESET_SEARCH_PARAMETERS:
      return {
        ...defaultSearchState,
        projects: state.projects,
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
