import {
  ProjectAction,
  UPDATE_PROJECT_EDITION_ROLE,
  OPEN_PROJECT_EDITION,
  CLOSE_PROJECT_EDITION,
  UPDATE_CURRENT_PROJECT,
  UPDATE_AUTHORS_TO_ADD,
  UPDATE_AUTHORS_TO_DELETE,
  UPDATE_SUPERVISORS_TO_ADD,
  UPDATE_SUPERVISORS_TO_DELETE,
} from "../../store/project/types";
import { Project, Person } from "../../types";
import store from "../../store";
import _ from "lodash";

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

export function addAuthorToAdd(a: Person): ProjectAction {
  return {
    type: UPDATE_AUTHORS_TO_ADD,
    payload: _.uniq(store.getState().project.authorsToAdd.concat(a)),
  };
}

export function addAuthorToDelete(a: Person): ProjectAction {
  return {
    type: UPDATE_AUTHORS_TO_DELETE,
    payload: _.uniq(store.getState().project.authorsToDelete.concat(a)),
  };
}

export function removeAuthorToAdd(a: Person): ProjectAction {
  return {
    type: UPDATE_AUTHORS_TO_ADD,
    payload: _.uniq(
      store.getState().project.authorsToAdd.filter((ata) => ata.id != a.id)
    ),
  };
}

export function removeAuthorToDelete(a: Person): ProjectAction {
  return {
    type: UPDATE_AUTHORS_TO_DELETE,
    payload: _.uniq(
      store.getState().project.authorsToDelete.filter((atd) => atd.id != a.id)
    ),
  };
}

export function addSupervisorToAdd(s: Person): ProjectAction {
  return {
    type: UPDATE_SUPERVISORS_TO_ADD,
    payload: _.uniq(store.getState().project.supervisorsToAdd.concat(s)),
  };
}

export function addSupervisorToDelete(s: Person): ProjectAction {
  return {
    type: UPDATE_SUPERVISORS_TO_DELETE,
    payload: _.uniq(store.getState().project.supervisorsToDelete.concat(s)),
  };
}

export function removeSupervisorToAdd(s: Person): ProjectAction {
  return {
    type: UPDATE_SUPERVISORS_TO_ADD,
    payload: _.uniq(
      store.getState().project.supervisorsToAdd.filter((sta) => sta.id != s.id)
    ),
  };
}

export function removeSupervisorToDelete(s: Person): ProjectAction {
  return {
    type: UPDATE_SUPERVISORS_TO_DELETE,
    payload: _.uniq(
      store
        .getState()
        .project.supervisorsToDelete.filter((std) => std.id != s.id)
    ),
  };
}
