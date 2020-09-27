import { SearchParams } from "../../types";

export function buildQueryParams({
  title,
  category,
  fromDate,
  toDate,
  orderBy,
  keyword,
  organization,
}: SearchParams) {
  return "?"
    .concat(buildQueryParamProperty("title", title))
    .concat(buildQueryParamProperty("category", category))
    .concat(buildQueryParamProperty("from", fromDate))
    .concat(buildQueryParamProperty("to", toDate))
    .concat(buildQueryParamProperty("orderBy", orderBy))
    .concat(buildQueryParamProperty("keyword", keyword))
    .concat(buildQueryParamProperty("organization", organization))
    .slice(0, -1);
  //TODO
  //params = params.concat(this.buildQueryParamProperty("keyword", this.state.keyword))
  //params = params.concat(this.buildQueryParamProperty("documentation", this.state.documentation))
}

function buildQueryParamProperty(key: string, value?: string) {
  return value ? key + "=" + value + "&" : "";
}
