import { CategoryQuantityType, ProjectCount } from "../types";
import withFetch, { FetchStatus } from "./withFetch";


const withProjectCount = (andThen?: (p: ProjectCount) => void): FetchStatus<ProjectCount> => {
  
  const [result] = withFetch<ProjectCount>("project-count", (e) => {
    if (andThen) {
      andThen(e);
    }
  });
  return result;
};

export default withProjectCount;
