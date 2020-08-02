import { Project, Person } from "../../components/Search/ProjectSummary";

export const UPDATE_ID = "UPDATE_ID";
export const UPDATE_TITLE = "UPDATE_TITLE";
export const UPDATE_DESCRIPTION = "UPDATE_DESCRIPTION";
export const UPDATE_POSTERURL = "UPDATE_POSTERURL";
export const UPDATE_AUTHORS = "UPDATE_AUTHORS";
export const UPDATE_CREATIONDATE = "UPDATE_CREATIONDATE";
export const UPDATE_TAGS = "UPDATE_TAGS";

interface UpdateIdAction {
  type: typeof UPDATE_ID;
  payload: String;
}

interface UpdateTitleAction {
  type: typeof UPDATE_TITLE;
  payload: String;
}

interface UpdateDescriptionAction {
  type: typeof UPDATE_DESCRIPTION;
  payload: String;
}

interface UpdatePosterUrlAction {
    type: typeof UPDATE_POSTERURL;
    payload: String;
  }


  interface UpdateAuthorsAction {
    type: typeof UPDATE_AUTHORS;
    payload: Array<Person>;
  }

  interface UpdateCreationDateAction {
    type: typeof UPDATE_CREATIONDATE;
    payload: Date;
  }

  interface UpdateTagsAction {
    type: typeof UPDATE_TAGS;
    payload: Array<String>;
  }

export type ProjectAction =
  | UpdateIdAction
  | UpdateTitleAction
  | UpdateDescriptionAction
  | UpdatePosterUrlAction
  | UpdateAuthorsAction
  | UpdateCreationDateAction
  | UpdateTagsAction;

export type ProjectState = {
  id: String;
  title: String;
  description: String;
  posterUrl: String,
  authors: Array<Person>;
  creationDate: Date;
  tags: Array<String>
};