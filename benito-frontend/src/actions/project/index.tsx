import {
  ProjectAction,
  UPDATE_PROJECT_EDITION_ROLE,
  OPEN_PROJECT_EDITION,
  CLOSE_PROJECT_EDITION,
  UPDATE_CURRENT_PROJECT,
} from "../../store/project/types";
import { Project } from "../../types";

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

export function openProjectEdition(p: Project): ProjectAction {
  return {
    type: OPEN_PROJECT_EDITION,
    payload: p,
  };
}

export function closeProjectEdition(): ProjectAction {
  return {
    type: CLOSE_PROJECT_EDITION,
  };
}

export function updateCurrentProject(p: Project): ProjectAction {
  return {
    type: UPDATE_CURRENT_PROJECT,
    payload: p,
  };
}
