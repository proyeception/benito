import { RecommendedProjects } from "../types";
import withFetch, { FetchStatus } from "./withFetch";

const withRecommendedProjectsByText = (textSearch: string, andThen?: (p: RecommendedProjects) => void): FetchStatus<RecommendedProjects> => {
  const [recommendations] = withFetch<RecommendedProjects>(
    `recommendations-by-text?textSearch=${textSearch}`, (e) => {
      if (andThen) {
        andThen(e);
      }
  });

  return recommendations
};

export default withRecommendedProjectsByText;
