import { Project } from "../types";
import withFetch from "./withFetch";

export default function withCustomizedRecommendations(
  customizationToken: string
) {
  const [projects] = withFetch<Array<Project>>(
    "users/recommendations",
    () => {},
    (config) => {
      return {
        ...config,
        headers: {
          ...config.headers,
          "x-customization-token": customizationToken,
        },
      };
    }
  );
  return projects;
}
