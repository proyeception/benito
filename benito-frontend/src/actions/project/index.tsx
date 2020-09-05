import { ProjectAction, UPDATE_CAN_EDIT } from "../../store/project/types";

export function updateCanEdit(b: Boolean): ProjectAction {
  return {
    type: UPDATE_CAN_EDIT,
    payload: b,
  };
}
