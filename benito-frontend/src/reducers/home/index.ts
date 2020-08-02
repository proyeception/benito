import {
  HomeAction,
  UPDATE_FEATURED_PROJECTS,
  HomeState,
  UPDATE_CATEGORIES,
} from "../../store/home/types";

const defaultHomeState: HomeState = {
  featuredProjects: [],
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
    default:
      return state;
  }
}

export default homeReducer;
