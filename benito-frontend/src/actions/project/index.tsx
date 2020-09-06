import {
  ProjectAction,
  UPDATE_PROJECT_EDITION_ROLE,
} from "../../store/project/types";

export function setProjectAuthor(): ProjectAction {
  return {
    type: UPDATE_PROJECT_EDITION_ROLE,
    payload: "AUTHOR",
  };
}

export function setProjectSupervisor(): ProjectAction {
  return {
    type: UPDATE_PROJECT_EDITION_ROLE,
    payload: "SUPERVISOR",
  };
}

export function setProjectVisitor(): ProjectAction {
  return {
    type: UPDATE_PROJECT_EDITION_ROLE,
    payload: "VISITOR",
  };
}
