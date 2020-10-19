import store from "../store";
import { Project } from "../types";
import withFetch, { FetchStatus } from "./withFetch";
import Cookies from "js-cookie";
import { X_CUSTOMIZATION_TOKEN } from "../functions/session";

const withProject = (
  projectId: string,
  andThen?: (p: Project) => void
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
      }
    },
    (config) => {
      let session = store.getState().session;

      if (session.isLoggedIn) {
        const token = session.token;

        return {
          ...config,
          headers: {
            ...config.headers,
            "x-qui-token": token,
          },
        };
      }

      return config;
    }
  );
  return project;
};

export default withProject;
