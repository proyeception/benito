import {
  SessionState,
  SessionAction,
  UPDATE_IS_LOGGED_IN,
  INVALIDATE_SESSION,
  UPDATE_IS_FETCHING,
  UPDATE_SESSION_INFO,
  UPDATE_SESSION_TOKEN,
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
        profilePicture: action.payload.profilePicUrl,
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
