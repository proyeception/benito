import { ProjectCreationTimelineType } from "../types";
import withFetch, { FetchStatus } from "./withFetch";


const withProjectCreationTimeline = (
  category: string,
  andThen?: (p: Array<ProjectCreationTimelineType>) => void
): FetchStatus<Array<ProjectCreationTimelineType>> => {
  let url = "stats/projectsxcategoryxyear"
  const [result] = withFetch<Array<ProjectCreationTimelineType>>("stats/projectsxcategoryxyear", (e) => {
    if (andThen) {
      andThen(e);
    }
  });

  return result;
};

export default withProjectCreationTimeline;
