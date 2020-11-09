import { TopCategories } from "../types";
import withFetch, { FetchStatus } from "./withFetch";


const withTopCategories = (andThen?: (p: TopCategories) => void): FetchStatus<TopCategories> => {
  
  const [result] = withFetch<TopCategories>("top4categories", (e) => {
    if (andThen) {
      andThen(e);
    }
  });
  console.log(result)
  return result;
};

export default withTopCategories;
