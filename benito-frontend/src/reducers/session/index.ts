import {
  SessionState,
  SessionAction,
  INVALIDATE_SESSION,
  UPDATE_SESSION_STATE,
} from "../../store/session/types";

const defaultSessionState: SessionState = {
  isLoggedIn: false,
};

function sessionReducer(
  state = defaultSessionState,
  action: SessionAction
): SessionState {
  switch (action.type) {
    case UPDATE_SESSION_STATE: {
      return action.payload;
    }
    case INVALIDATE_SESSION: {
      return defaultSessionState;
    }
    default:
      return state;
  }
}

export default sessionReducer;
