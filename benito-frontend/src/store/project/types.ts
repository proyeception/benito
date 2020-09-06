import { ProjectEditionRole } from "../../types";

export const UPDATE_PROJECT_EDITION_ROLE = "UPDATE_PROJECT_EDITION_ROLE";

interface UpdateProjectEditionRoleAction {
  type: typeof UPDATE_PROJECT_EDITION_ROLE;
  payload: ProjectEditionRole;
}

export type ProjectState = {
  editionRole: ProjectEditionRole;
};

export type ProjectAction = UpdateProjectEditionRoleAction;
