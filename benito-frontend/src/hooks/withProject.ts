import { Project } from "../types";
import withFetch, { FetchStatus } from "./withFetch";
import Cookies from "js-cookie";
import { X_CUSTOMIZATION_TOKEN } from "../functions/session";
import store from "../store";
import { updateCustomizationToken } from "../actions/common";

const withProject = (
  projectId: string,
  andThen?: (p: Project) => void,
  listener?: string
): FetchStatus<Project> => {
  const [project] = withFetch<Project>(
    `projects/${projectId}`,
    (e) => {
      if (andThen) {
        andThen(e);
      }
      const customizationToken = Cookies.get(X_CUSTOMIZATION_TOKEN);

      if (customizationToken) {
        localStorage.setItem(X_CUSTOMIZATION_TOKEN, customizationToken);
        store.dispatch(updateCustomizationToken(customizationToken));
      }
    },
    listener ? [listener] : []
  );
  return project;
};

export default withProject;
