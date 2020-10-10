import { Project, SearchParams } from "../types";
import withFetch, { FetchStatus } from "./withFetch";

type Refresh = (params: SearchParams) => void;

const withRecommendations = (projectId: string): FetchStatus<Array<Project>> => {
  const [recommendations] = withFetch<Array<Project>>(
    `projects/${projectId}/recommendations`
  );

  return recommendations
};

export default withRecommendations;
