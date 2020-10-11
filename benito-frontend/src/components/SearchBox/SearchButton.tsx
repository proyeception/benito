import Button from "../CustomButtons/Button";
import React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { buildQueryParams } from "../../functions/search";
import { RootState } from "../../reducers";
import { Category, Organization, SortMethod } from "../../types";

interface SearchButtonProps extends RouteComponentProps {
  callback?: () => void;
  categories: Array<Category>;
  organizations: Array<Organization>;
  category?: Category;
  organization?: Organization;
  orderBy?: SortMethod;
  title?: string;
  from?: Date;
  to?: Date;
  keyword?: string;
  fullWidth?: boolean;
}

const SearchButton = (props: SearchButtonProps) => (
  <Button
    color="primary"
    default
    fullWidth={props.fullWidth ? props.fullWidth : true}
    onClick={() => {
      const params = buildQueryParams({
        ...props,
        category: props.category?.tagName?.valueOf(),
        organizationName: props.organization?.name?.valueOf(),
      });
      props.history.push("/search" + params);
      if (props.callback) {
        props.callback();
      }
    }}
  >
    Buscar
  </Button>
);

const mapStateToProps = (rootState: RootState) => {
  return {
    categories: rootState.common.categories,
    organizations: rootState.common.organizations,
    title: rootState.search.title,
    category: rootState.search.category,
    orderBy: rootState.search.orderBy,
    from: rootState.search.fromDate,
    to: rootState.search.toDate,
    organization: rootState.search.organization,
    keyword: rootState.search.keyword,
  };
};

export default hot(module)(connect(mapStateToProps)(withRouter(SearchButton)));
