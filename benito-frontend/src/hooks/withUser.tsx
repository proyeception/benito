import { useEffect, useState } from "react";
import { fetchUser } from "../functions/user";
import { Person } from "../types";

function withUser(
  userId: String,
  collection: "authors" | "supervisors"
): [Person, Boolean, Boolean, Boolean] {
  const [user, setUser] = useState<Person>(null);
  const [fetching, setFetching] = useState(true);
  const [error, setIsError] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchUser(collection, userId)
      .then(setUser)
      .then(() => setFetching(false))
      .catch((e) => {
        if (e.response.status == 404) {
          setNotFound(true);
        }
        setIsError(true);
      });
  }, []);

  return [user, fetching, error, notFound];
}

export default withUser;
