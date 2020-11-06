import { ProjectCount } from "../types";
import withFetch, { FetchStatus } from "./withFetch";


const withSearchCount = (andThen?: (p: ProjectCount) => void): FetchStatus<ProjectCount> => {
  
  const [result] = withFetch<ProjectCount>("stats/searchcount", (e) => {
    if (andThen) {
      andThen(e);
    }
  });
  return result;
};

export default withSearchCount;
