import { updateSearchParams } from "../../actions/search";
import searchPageStyle from "../../assets/jss/material-kit-react/views/searchPage";
import store from "../../store";
import { NOTHING, SearchState } from "../../store/search/types";
import { SearchParams, SortMethod } from "../../types";
import { fromCategoryName } from "../categories";
import moment from "moment";
import { fromOrganizationName } from "../organization";

export function buildQueryParams({
  title,
  category,
  from,
  to,
  orderBy,
  keyword,
  organizationName: organization,
}: SearchParams) {
  var query = "?"
    .concat(buildQueryParamProperty("title", title))
    .concat(buildQueryParamProperty("category", category))
    .concat(buildQueryParamProperty("from", from))
    .concat(buildQueryParamProperty("to", to))
    .concat(buildQueryParamProperty("orderBy", orderBy))
    .concat(buildQueryParamProperty("keyword", keyword))
    .concat(buildQueryParamProperty("organizationName", organization))
    .slice(0, -1);

    return query;
  //TODO
  //params = params.concat(this.buildQueryParamProperty("keyword", this.state.keyword))
  //params = params.concat(this.buildQueryParamProperty("documentation", this.state.documentation))
}

function buildQueryParamProperty(key: string, value?: string) {
  return value ? key + "=" + value + "&" : "";
}

export function syncParamsToState(params: SearchParams) {
  let state: SearchState = {
    title: params.title || "",
    category: fromCategoryName(params.category),
    from: params.from
      ? params.from
      : undefined,
    to: params.to
      ? params.to
      : undefined,
    documentation: params.documentation || "",
    keyword: params.keyword || "",
    orderBy: params.orderBy || SortMethod.DateDesc,
    organization: fromOrganizationName(params.organizationName),
    status: NOTHING,
  };
  store.dispatch(updateSearchParams(state));
}
