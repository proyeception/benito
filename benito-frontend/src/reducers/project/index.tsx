import {
    ProjectAction,
    ProjectState,
    UPDATE_ID,
    UPDATE_TITLE,
    UPDATE_DESCRIPTION,
    UPDATE_POSTERURL,
    UPDATE_AUTHORS,
    UPDATE_CREATIONDATE,
    UPDATE_TAGS
  } from "../../store/project/types";
  
  const defaultProjectState: ProjectState = {
    id: "",
    title: "",
    description: "",
    posterUrl: "",
    authors: [],
    creationDate: new Date(),
    tags: []
  };
  
  function projectReducer(
    state = defaultProjectState,
    action: ProjectAction
  ): ProjectState {
    switch (action.type) {
      case UPDATE_ID:
        return {
          ...state,
          id: action.payload,
        };
      case UPDATE_TITLE:
        return {
          ...state,
          title: action.payload,
        };
      case UPDATE_DESCRIPTION:
        return {
          ...state,
          description: action.payload,
        };
        case UPDATE_POSTERURL:
        return {
            ...state,
            posterUrl: action.payload,
        };
        case UPDATE_AUTHORS:
        return {
            ...state,
            authors: action.payload,
        };
        case UPDATE_CREATIONDATE:
        return {
            ...state,
            creationDate: action.payload,
        };
        case UPDATE_TAGS:
        return {
            ...state,
            tags: action.payload,
        };
      default:
        return state;
    }
  }
  
  export default projectReducer;