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
  fromDate,
  toDate,
  orderBy,
  keyword,
  organizationName: organization,
}: SearchParams) {
  return "?"
    .concat(buildQueryParamProperty("title", title))
    .concat(buildQueryParamProperty("category", category))
    .concat(buildQueryParamProperty("from", fromDate))
    .concat(buildQueryParamProperty("to", toDate))
    .concat(buildQueryParamProperty("orderBy", orderBy))
    .concat(buildQueryParamProperty("keyword", keyword))
    .concat(buildQueryParamProperty("organizationName", organization))
    .slice(0, -1);
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
    fromDate: params.fromDate
      ? moment(params.fromDate, "yyyy/MM/dd").toDate()
      : undefined,
    toDate: params.toDate
      ? moment(params.toDate, "yyyy/MM/dd").toDate()
      : undefined,
    documentation: params.documentation || "",
    keyword: params.keyword || "",
    orderBy: params.orderBy || SortMethod.DateDesc,
    organization: fromOrganizationName(params.organizationName),
    status: NOTHING,
  };
  store.dispatch(updateSearchParams(state));
}
