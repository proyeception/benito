import {
  ProjectState,
  ProjectAction,
  UPDATE_PROJECT_EDITION_ROLE,
  OPEN_PROJECT_EDITION,
  CLOSE_PROJECT_EDITION,
  EDIT_TITLE,
  EDIT_DESCRIPTION,
  EDIT_POSTERURL,
  EDIT_EXTRA_CONTENT,
  UPDATE_CURRENT_PROJECT,
} from "../../store/project/types";

const defaultProjectState: ProjectState = {
  editionRole: "VISITOR",
  isEditing: false,
};

function projectReducer(state = defaultProjectState, action: ProjectAction) {
  switch (action.type) {
    case UPDATE_PROJECT_EDITION_ROLE: {
      return {
        ...state,
        editionRole: action.payload,
      };
    }
    case OPEN_PROJECT_EDITION: {
      return {
        ...state,
        isEditing: true,
        edition: {
          description: action.payload.description,
          title: action.payload.title,
          extraContent: action.payload.extraContent,
          posterUrl: action.payload.posterUrl,
        },
      };
    }
    case CLOSE_PROJECT_EDITION: {
      return {
        ...state,
        isEditing: false,
        edition: undefined,
      };
    }
    case EDIT_TITLE: {
      return {
        ...state,
        edition: {
          ...state.edition,
          title: action.payload,
        },
      };
    }
    case EDIT_DESCRIPTION: {
      return {
        ...state,
        edition: {
          ...state.edition,
          description: action.payload,
        },
      };
    }
    case EDIT_POSTERURL: {
      return {
        ...state,
        edition: {
          ...state.edition,
          posterUrl: action.payload,
        },
      };
    }
    case EDIT_EXTRA_CONTENT: {
      return {
        ...state,
        edition: {
          ...state.edition,
          extraContent: action.payload,
        },
      };
    }
    case UPDATE_CURRENT_PROJECT: {
      return {
        ...state,
        project: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export default projectReducer;
