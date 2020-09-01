import {
  SessionState,
  SessionAction,
  UPDATE_TOKEN,
  UPDATE_USER_ID,
  UPDATE_IS_LOGGED_IN,
  UPDATE_PROFILE_PICTURE,
  INVALIDATE_SESSION,
} from "../../store/session/types";

const defaultSessionState: SessionState = {
  isLoggedIn: false,
};

function sessionReducer(
  state = defaultSessionState,
  action: SessionAction
): SessionState {
  switch (action.type) {
    case UPDATE_TOKEN: {
      return {
        ...state,
        token: action.payload,
      };
    }
    case UPDATE_USER_ID: {
      return {
        ...state,
        userId: action.payload,
      };
    }
    case UPDATE_IS_LOGGED_IN: {
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    }
    case UPDATE_PROFILE_PICTURE: {
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
