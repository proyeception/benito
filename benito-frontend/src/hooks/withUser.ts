import { mapRoleToCollection } from "../functions/user";
import { Person, Role } from "../types";
import withFetch, { FetchStatus } from "./withFetch";

const withUser = (role: Role, userId: string, andThen?: (p: Person) => void): FetchStatus<Person> => {
  const [person] = withFetch<Person>(`${mapRoleToCollection(role)}/${userId}`, andThen);
  return person;
};

export default withUser;
