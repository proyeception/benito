import {
    ProjectAction,
    UPDATE_ID,
    UPDATE_TITLE,
    UPDATE_DESCRIPTION,
    UPDATE_POSTERURL,
    UPDATE_AUTHORS,
    UPDATE_CREATIONDATE,
    UPDATE_TAGS,
  } from "../../store/project/types";
  import { Person } from "../../components/Search/ProjectSummary";
  
  export function updateId(id: String):ProjectAction {
    return {
      type: UPDATE_ID,
      payload: id,
    };
  }
  
  export function updateTitle(title: String):ProjectAction {
    return {
      type: UPDATE_TITLE,
      payload: title,
    };
  }
  
  export function updateDescruption(description: String):ProjectAction {
    return {
      type: UPDATE_DESCRIPTION,
      payload: description,
    };
  }

  export function updatePosterUrl(posterUrl: String):ProjectAction {
    return {
      type: UPDATE_POSTERURL,
      payload: posterUrl,
    };
  }

  export function updateAuthors(authors: Array<Person>):ProjectAction {
    return {
      type: UPDATE_AUTHORS,
      payload: authors,
    };
  }

  export function updateCreationDate(creationDate: Date):ProjectAction {
    return {
      type: UPDATE_CREATIONDATE,
      payload: creationDate,
    };
  }

  export function updateTags(tags: Array<String>):ProjectAction {
    return {
      type: UPDATE_TAGS,
      payload: tags,
    };
  }