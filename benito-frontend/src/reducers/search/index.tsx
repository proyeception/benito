import {
  SearchAction,
  SearchState,
  UPDATE_TITLE,
  UPDATE_CATEGORY,
  UPDATE_FROM_DATE,
  UPDATE_TO_DATE,
  UPDATE_KEYWORD,
  UPDATE_DOCUMENTATION,
  UPDATE_SORT_METHOD,
  RESET_SEARCH_PARAMETERS,
  UPDATE_ORGANIZATION,
  UPDATE_SEARCH_PARAMS,
  NOTHING,
  UPDATE_FETCH_STATUS,
  UPDATE_TAG,
} from "../../store/search/types";
import { SortMethod } from "../../types";
import moment from "moment";

const defaultSearchState: SearchState = {
  orderBy: SortMethod.DateDesc,
  status: NOTHING,
};

function searchReducer(
  state = defaultSearchState,
  action: SearchAction
): SearchState {
  switch (action.type) {
    case UPDATE_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    case UPDATE_TAG:
      return {
        ...state,
        tag: action.payload,
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case UPDATE_FROM_DATE:
      return {
        ...state,
        from: action.payload,
      };
    case UPDATE_TO_DATE:
      return {
        ...state,
        to: action.payload,
      };
    case UPDATE_KEYWORD:
      return {
        ...state,
        keyword: action.payload,
      };
    case UPDATE_DOCUMENTATION:
      return {
        ...state,
        documentation: action.payload,
      };
    case UPDATE_SORT_METHOD:
      return {
        ...state,
        orderBy: action.payload,
      };
    case RESET_SEARCH_PARAMETERS:
      return {
        ...defaultSearchState,
      };
    case UPDATE_ORGANIZATION:
      return {
        ...state,
        organization: action.payload,
      };
    case UPDATE_SEARCH_PARAMS:
      return {
        orderBy: action.payload.orderBy || state.orderBy,
        status: state.status,
        documentation: action.payload.documentation || state.documentation,
        from: action.payload.from
          ? moment(action.payload.from, "yyyy-MM-DD").toString()
          : state.from,
        to: action.payload.to
          ? moment(action.payload.to, "yyyy-MM-DD").toString()
          : state.to,
        keyword: action.payload.keyword || state.keyword,
        keywordSearch: action.payload.keywordSearch,
        organization: action.payload.organization || state.organization,
        title: action.payload.title || state.title,
        tag: action.payload.tag || state.tag,
        category: action.payload.category || state.category,
      };
    case UPDATE_FETCH_STATUS: {
      return {
        ...state,
        status: action.payload,
      };
    }
    default:
      return state;
  }
}

export default searchReducer;
