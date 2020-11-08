import {
  SessionState,
  SessionAction,
  INVALIDATE_SESSION,
  UPDATE_SESSION_STATE,
  UPDATE_SESSION_FULL_NAME,
  UPDATE_SESSION_STATE_CHATBOT,
} from "../../store/session/types";

const defaultSessionState: SessionState = {
  isLoggedIn: false,
  chatBotOpen: false
};

function sessionReducer(
  state = defaultSessionState,
  action: SessionAction
): SessionState {
  switch (action.type) {
    case UPDATE_SESSION_STATE: {
      return action.payload;
    }
    case UPDATE_SESSION_STATE_CHATBOT: {
      return {
        ...state,
        chatBotOpen: action.payload,
      };
    }
    case INVALIDATE_SESSION: {
      return defaultSessionState;
    }
    case UPDATE_SESSION_FULL_NAME: {
      if (state.isLoggedIn) {
        return {
          ...state,
          fullName: action.payload,
        };
      } else {
        return state;
      }
    }
    default:
      return state;
  }
}

export default sessionReducer;
