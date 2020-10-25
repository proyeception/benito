import { CategoryQuantityType } from "../types";
import withFetch, { FetchStatus } from "./withFetch";


const withProjectxCategories = (
  organizationId: string,
  andThen?: (p: Array<CategoryQuantityType>) => void
): FetchStatus<Array<CategoryQuantityType>> => {
  let url = "stats/projectsxcategory"
  if(organizationId != "") {
    url = "stats/projectsxcategory?organizationId=" + organizationId
  }
  const [result] = withFetch<Array<CategoryQuantityType>>("stats/projectsxcategory", (e) => {
    if (andThen) {
      andThen(e);
    }
  });
  return result;
};

export default withProjectxCategories;
