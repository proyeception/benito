import {
  SessionState,
  SessionAction,
  UPDATE_IS_LOGGED_IN,
  INVALIDATE_SESSION,
  UPDATE_IS_FETCHING,
  UPDATE_SESSION_INFO,
  UPDATE_SESSION_TOKEN,
  UPDATE_SESSION_PROFILE_PICTURE,
} from "../../store/session/types";

const defaultSessionState: SessionState = {
  isLoggedIn: false,
  fetching: false,
};

function sessionReducer(
  state = defaultSessionState,
  action: SessionAction
): SessionState {
  switch (action.type) {
    case UPDATE_IS_LOGGED_IN: {
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    }
    case UPDATE_SESSION_TOKEN: {
      return {
        ...state,
        token: action.payload,
      };
    }
    case UPDATE_IS_FETCHING: {
      return {
        ...state,
        fetching: action.payload,
      };
    }
    case UPDATE_SESSION_INFO: {
      return {
        ...state,
        userId: action.payload.userId,
        role: action.payload.role,
      };
    }
    case UPDATE_SESSION_PROFILE_PICTURE: {
      return {
        ...state,
        profilePicture: action.payload,
      };
    }
    case INVALIDATE_SESSION: {
      return defaultSessionState;
    }
    default:
      return state;
  }
}

export default sessionReducer;
