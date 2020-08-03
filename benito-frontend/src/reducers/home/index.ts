import {
  HomeAction,
  UPDATE_FEATURED_PROJECTS,
  HomeState,
  UPDATE_CATEGORIES,
  UPDATE_LATEST_PROJECTS,
} from "../../store/home/types";

const defaultHomeState: HomeState = {
  featuredProjects: [],
  latestProjects: [],
  categories: [],
};

function homeReducer(state = defaultHomeState, action: HomeAction) {
  switch (action.type) {
    case UPDATE_FEATURED_PROJECTS:
      return {
        ...state,
        featuredProjects: action.payload,
      };
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case UPDATE_LATEST_PROJECTS:
      return {
        ...state,
        latestProjects: action.payload,
      };
    default:
      return state;
  }
}

export default homeReducer;
