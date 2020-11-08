import {
  CommonState,
  CommonAction,
  UPDATE_CATEGORIES,
  TOGGLE_HAMBURGER_BUTTON,
  TOGGLE_LOADING,
  UPDATE_ORGANIZATIONS,
} from "../../store/common/types";

const defaultCommonState: CommonState = {
  categories: [],
  isMenuOpen: false,
  loading: true,
  organizations: [],
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
    case TOGGLE_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case UPDATE_ORGANIZATIONS: {
      return {
        ...state,
        organizations: action.payload,
      };
    }
    default:
      return state;
  }
}

export default commonReducer;
