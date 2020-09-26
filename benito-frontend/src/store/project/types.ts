import { ProjectEditionRole, Project, Person } from "../../types";

export const UPDATE_PROJECT_EDITION_ROLE = "UPDATE_PROJECT_EDITION_ROLE";
export const OPEN_PROJECT_EDITION = "OPEN_PROJECT_EDITION";
export const CLOSE_PROJECT_EDITION = "CLOSE_PROJECT_EDITION";
export const EDIT_TITLE = "EDIT_TITLE";
export const EDIT_DESCRIPTION = "EDIT_DESCRIPTION";
export const EDIT_PICTUREURL = "EDIT_PICTUREURL";
export const EDIT_EXTRA_CONTENT = "EDIT_EXTRA_CONTENT";
export const UPDATE_CURRENT_PROJECT = "UPDATE_CURRENT_PROJECT";
export const UPDATE_AUTHORS_TO_ADD = "UPDATE_AUTHORS_TO_ADD";
export const UPDATE_SUPERVISORS_TO_ADD = "UPDATE_SUPERVISORS_TO_ADD";
export const UPDATE_AUTHORS_TO_DELETE = "UPDATE_AUTHORS_TO_DELETE";
export const UPDATE_SUPERVISORS_TO_DELETE = "UPDATE_SUPERVISORS_TO_DELETE";

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

interface EditPictureUrlAction {
  type: typeof EDIT_PICTUREURL;
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

interface UpdateAuthorsToAddAction {
  type: typeof UPDATE_AUTHORS_TO_ADD;
  payload: Array<Person>;
}

interface UpdateAuthorsToDeleteAction {
  type: typeof UPDATE_AUTHORS_TO_DELETE;
  payload: Array<Person>;
}

interface UpdateSupervisorsToAddAction {
  type: typeof UPDATE_SUPERVISORS_TO_ADD;
  payload: Array<Person>;
}

interface UpdateSupervisorsToDeleteAction {
  type: typeof UPDATE_SUPERVISORS_TO_DELETE;
  payload: Array<Person>;
}

export type ProjectState = {
  editionRole?: ProjectEditionRole;
  project?: Project;
  isEditing: Boolean;
  authorsToAdd: Array<Person>;
  authorsToDelete: Array<Person>;
  supervisorsToAdd: Array<Person>;
  supervisorsToDelete: Array<Person>;
};

export type ProjectAction =
  | UpdateProjectEditionRoleAction
  | OpenProjectEditionAction
  | CloseProjectEditionAction
  | EditTitleAction
  | EditDescriptionAction
  | EditPictureUrlAction
  | EditExtraContentAction
  | UpdateCurrentProjectAction
  | UpdateAuthorsToAddAction
  | UpdateAuthorsToDeleteAction
  | UpdateSupervisorsToAddAction
  | UpdateSupervisorsToDeleteAction;
