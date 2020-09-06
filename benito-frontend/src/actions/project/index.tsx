import {
  ProjectAction,
  UPDATE_PROJECT_EDITION_ROLE,
  OPEN_PROJECT_EDITION,
  CLOSE_PROJECT_EDITION,
  EDIT_TITLE,
  EDIT_DESCRIPTION,
  EDIT_EXTRA_CONTENT,
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

export function editTitle(s: String): ProjectAction {
  return {
    type: EDIT_TITLE,
    payload: s,
  };
}

export function editDescription(s: String): ProjectAction {
  return {
    type: EDIT_DESCRIPTION,
    payload: s,
  };
}

export function editExtraContent(s: String): ProjectAction {
  return {
    type: EDIT_EXTRA_CONTENT,
    payload: s,
  };
}

export function updateCurrentProject(p: Project): ProjectAction {
  return {
    type: UPDATE_CURRENT_PROJECT,
    payload: p,
  };
}
