import { Project } from "../types";
import withFetch from "./withFetch";

export default function withFeaturedProjects() {
  const [projects] = withFetch<Array<Project>>("projects/featured");
  return projects;
}
