import {
  ProjectState,
  ProjectAction,
  UPDATE_PROJECT_EDITION_ROLE,
} from "../../store/project/types";

const defaultProjectState: ProjectState = {
  editionRole: "VISITOR",
};

function projectReducer(state = defaultProjectState, action: ProjectAction) {
  switch (action.type) {
    case UPDATE_PROJECT_EDITION_ROLE: {
      return {
        ...defaultProjectState,
        editionRole: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export default projectReducer;
