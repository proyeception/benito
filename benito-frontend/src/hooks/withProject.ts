import store from "../store";
import { Project } from "../types";
import withFetch, { FetchStatus } from "./withFetch";

const withProject = (
  projectId: string,
  andThen?: (p: Project) => void
): FetchStatus<Project> => {
  const [project] = withFetch<Project>(
    `projects/${projectId}`,
    andThen,
    (config) => {
      let session = store.getState().session;

      if (session.isLoggedIn) {
        const userId = session.userId;
        return {
          ...config,
          headers: {
            ...config.headers,
            "x-qui-token": userId,
          },
        };
      }

      return config;
    }
  );
  return project;
};

export default withProject;
