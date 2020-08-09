import {
  CommonState,
  CommonAction,
  UPDATE_CATEGORIES,
  TOGGLE_HAMBURGER_BUTTON,
} from "../../store/common/types";

const defaultCommonState: CommonState = {
  categories: [],
  isMenuOpen: false,
};

function commonReducer(state = defaultCommonState, action: CommonAction) {
  switch (action.type) {
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case TOGGLE_HAMBURGER_BUTTON:
      return {
        ...state,
        isMenuOpen: action.payload,
      };
    default:
      return state;
  }
}

export default commonReducer;
