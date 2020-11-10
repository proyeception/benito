import { TopCategories } from "../types";
import withFetch, { FetchStatus } from "./withFetch";


const withTopCategories = (andThen?: (p: TopCategories) => void): FetchStatus<TopCategories> => {
  
  const [result] = withFetch<TopCategories>("top4categories", (e) => {
    if (andThen) {
      andThen(e);
    }
  });
  return result;
};

export default withTopCategories;
