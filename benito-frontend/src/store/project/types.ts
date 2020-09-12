import { ProjectEditionRole, ProjectEdition, Project } from "../../types";

export const UPDATE_PROJECT_EDITION_ROLE = "UPDATE_PROJECT_EDITION_ROLE";
export const OPEN_PROJECT_EDITION = "OPEN_PROJECT_EDITION";
export const CLOSE_PROJECT_EDITION = "CLOSE_PROJECT_EDITION";
export const EDIT_TITLE = "EDIT_TITLE";
export const EDIT_DESCRIPTION = "EDIT_DESCRIPTION";
export const EDIT_POSTERURL = "EDIT_POSTERURL";
export const EDIT_EXTRA_CONTENT = "EDIT_EXTRA_CONTENT";
export const UPDATE_CURRENT_PROJECT = "UPDATE_CURRENT_PROJECT";

interface UpdateProjectEditionRoleAction {
  type: typeof UPDATE_PROJECT_EDITION_ROLE;
  payload: ProjectEditionRole;
}

interface OpenProjectEditionAction {
  type: typeof OPEN_PROJECT_EDITION;
  payload: Project;
}

interface CloseProjectEditionAction {
  type: typeof CLOSE_PROJECT_EDITION;
}

interface EditTitleAction {
  type: typeof EDIT_TITLE;
  payload: String;
}

interface EditDescriptionAction {
  type: typeof EDIT_DESCRIPTION;
  payload: String;
}

interface EditPosterUrlAction {
  type: typeof EDIT_POSTERURL;
  payload: String;
}

interface EditExtraContentAction {
  type: typeof EDIT_EXTRA_CONTENT;
  payload: String;
}

interface UpdateCurrentProjectAction {
  type: typeof UPDATE_CURRENT_PROJECT;
  payload: Project;
}

export type ProjectState = {
  editionRole?: ProjectEditionRole;
  project?: Project;
  isEditing: Boolean;
  edition?: ProjectEdition;
};

export type ProjectAction =
  | UpdateProjectEditionRoleAction
  | OpenProjectEditionAction
  | CloseProjectEditionAction
  | EditTitleAction
  | EditDescriptionAction
  | EditPosterUrlAction
  | EditExtraContentAction
  | UpdateCurrentProjectAction;
