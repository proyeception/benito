import {
  ProjectState,
  ProjectAction,
  UPDATE_CAN_EDIT,
} from "../../store/project/types";

const defaultProjectState: ProjectState = {
  canEdit: false,
};

function projectReducer(state = defaultProjectState, action: ProjectAction) {
  switch (action.type) {
    case UPDATE_CAN_EDIT: {
      return {
        ...defaultProjectState,
        canEdit: action.payload,
      };
    }
    default: {
      return defaultProjectState;
    }
  }
}

export default projectReducer;
