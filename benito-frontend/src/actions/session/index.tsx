import {
  SessionAction,
  INVALIDATE_SESSION,
  UPDATE_SESSION_STATE,
  LoggedInState,
  UPDATE_SESSION_FULL_NAME,
  UPDATE_SESSION_SELECTED_ORGANIZATION,
  UPDATE_SESSION_STATE_CHATBOT
} from "../../store/session/types";
import { Organization } from "../../types";

export function updateSessionState(loginState: LoggedInState): SessionAction {
  return {
    type: UPDATE_SESSION_STATE,
    payload: loginState,
  };
}

export function updateSessionStateChatbot(chatBotOpen: boolean): SessionAction {
  return {
    type: UPDATE_SESSION_STATE_CHATBOT,
    payload: chatBotOpen,
  };
}

export function invalidateSession(): SessionAction {
  return {
    type: INVALIDATE_SESSION,
  };
}

export function updateSessionFullName(n: string): SessionAction {
  return {
    type: UPDATE_SESSION_FULL_NAME,
    payload: n,
  };
}

export function updateSessionSelectedOrganization(o: Organization): SessionAction {
  return {
    type: UPDATE_SESSION_SELECTED_ORGANIZATION,
    payload: o,
  };
}
