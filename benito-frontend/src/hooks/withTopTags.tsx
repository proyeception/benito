import { TopTag } from "../types";
import withFetch, { FetchStatus } from "./withFetch";


const withTopTags = (
  andThen?: (p: Array<TopTag>) => void
): FetchStatus<Array<TopTag>> => {
  const [result] = withFetch<Array<TopTag>>("stats/toptags", (e) => {
    if (andThen) {
      andThen(e);
    }
  });
  return result;
};

export default withTopTags;
