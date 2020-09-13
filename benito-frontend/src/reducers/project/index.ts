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
  UPDATE_AUTHORS_TO_ADD,
  UPDATE_AUTHORS_TO_DELETE,
  UPDATE_SUPERVISORS_TO_ADD,
  UPDATE_SUPERVISORS_TO_DELETE,
} from "../../store/project/types";

const defaultProjectState: ProjectState = {
  editionRole: "VISITOR",
  isEditing: false,
  authorsToAdd: [],
  authorsToDelete: [],
  supervisorsToAdd: [],
  supervisorsToDelete: [],
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
        ...defaultProjectState,
        project: state.project,
        editionRole: state.editionRole,
      };
    }
    case UPDATE_CURRENT_PROJECT: {
      return {
        ...state,
        project: action.payload,
      };
    }
    case UPDATE_AUTHORS_TO_ADD: {
      return {
        ...state,
        authorsToAdd: action.payload,
      };
    }
    case UPDATE_AUTHORS_TO_DELETE: {
      return {
        ...state,
        authorsToDelete: action.payload,
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
    case UPDATE_SUPERVISORS_TO_ADD: {
      return {
        ...state,
        supervisorsToAdd: action.payload,
      };
    }
    case UPDATE_SUPERVISORS_TO_DELETE: {
      return {
        ...state,
        supervisorsToDelete: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export default projectReducer;
