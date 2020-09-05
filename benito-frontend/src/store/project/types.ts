export const UPDATE_CAN_EDIT = "UPDATE_CAN_EDIT";

interface UpdateCanEditAction {
  type: typeof UPDATE_CAN_EDIT;
  payload: Boolean;
}

export type ProjectState = {
  canEdit: Boolean;
};

export type ProjectAction = UpdateCanEditAction;
