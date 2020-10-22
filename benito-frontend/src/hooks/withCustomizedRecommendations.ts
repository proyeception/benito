import { Project } from "../types";
import withFetch from "./withFetch";

export default function withCustomizedRecommendations() {
  const [projects] = withFetch<Array<Project>>(
    "users/recommendations",
    () => {}
  );
  return projects;
}
