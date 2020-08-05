import {
  CommonState,
  CommonAction,
  UPDATE_CATEGORIES,
} from "../../store/common/types";

const defaultCommonState: CommonState = {
  categories: [],
};

function commonReducer(state = defaultCommonState, action: CommonAction) {
  switch (action.type) {
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
}

export default commonReducer;
