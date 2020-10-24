import { OrganizationQuantityType } from "../types";
import withFetch, { FetchStatus } from "./withFetch";


const withProjectxOrganizations = (
  category: string,
  andThen?: (p: Array<OrganizationQuantityType>) => void
): FetchStatus<Array<OrganizationQuantityType>> => {
  let url = "stats/projectsxorganization"
  if(category != "") {
    url = "stats/projectsxorganization?category=" + category
  }
  const [result] = withFetch<Array<OrganizationQuantityType>>("stats/projectsxorganization", (e) => {
    if (andThen) {
      andThen(e);
    }
  });
  return result;
};

export default withProjectxOrganizations;
