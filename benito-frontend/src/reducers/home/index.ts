import {
  HomeAction,
  UPDATE_REMARKABLE_PROJECTS,
  HomeState,
} from "../../store/home/types";

const defaultHomeState: HomeState = {
  remarkableProjects: [],
};

function homeReducer(state = defaultHomeState, action: HomeAction) {
  switch (action.type) {
    case UPDATE_REMARKABLE_PROJECTS:
      return {
        ...state,
        remarkableProjects: action.payload,
      };
    default:
      return state;
  }
}

export default homeReducer;
