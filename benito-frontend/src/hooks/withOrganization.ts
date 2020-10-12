import { Organization } from "../types";
import withFetch from "./withFetch";

export default function withOrganization(id: string) {
  const [organization] = withFetch<Organization>(`organizations/${id}`);
  return organization;
}
