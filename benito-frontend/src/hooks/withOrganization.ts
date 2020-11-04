import { Organization } from "../types";
import withFetch from "./withFetch";

export default function withOrganization(id: string, andThen?: (p: Organization) => void,) {
  const [organization] = withFetch<Organization>(`organizations/${id}`,
  (e) => {
    if (andThen) {
      andThen(e);
    }
  });
  return organization;
}
