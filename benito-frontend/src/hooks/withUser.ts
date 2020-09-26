import { mapRoleToCollection } from "../functions/user";
import { Person, Role } from "../types";
import withFetch, { FetchStatus } from "./withFetch";

const withUser = (role: Role, userId: String): FetchStatus<Person> =>
  withFetch<Person>(`${mapRoleToCollection(role)}/${userId}`);

export default withUser;
