import {
  SearchAction,
  SearchState,
  UPDATE_NAME,
  UPDATE_CATEGORY,
  UPDATE_PROJECTS,
} from "../../store/search/types";

const defaultSearchState: SearchState = {
  name: "",
  category: "",
  projects: [],
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
    default:
      return state;
  }
}

export default searchReducer;
