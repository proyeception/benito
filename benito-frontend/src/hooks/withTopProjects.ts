import { TopProject } from "../types";
import withFetch, { FetchStatus } from "./withFetch";


const withTopProjects = (
  andThen?: (p: Array<TopProject>) => void
): FetchStatus<Array<TopProject>> => {
  const [result] = withFetch<Array<TopProject>>("stats/topprojects", (e) => {
    if (andThen) {
      andThen(e);
    }
  });
  return result;
};

export default withTopProjects;
