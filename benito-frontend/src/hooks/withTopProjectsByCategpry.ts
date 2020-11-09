import { RecommendedProjects, TopCategories } from "../types";
import withFetch, { FetchStatus } from "./withFetch";


const withTopProjectsByCategory = (category: string, andThen?: (p: RecommendedProjects) => void): FetchStatus<RecommendedProjects> => {
  
  const [result] = withFetch<RecommendedProjects>(`top-projects-category/${category}`, (e) => {
    if (andThen) {
      andThen(e);
    }
  });
  console.log(result)
  return result;
};

export default withTopProjectsByCategory;