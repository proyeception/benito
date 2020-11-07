import Button from "../CustomButtons/Button";
import React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { buildQueryParams } from "../../functions/search";
import { RootState } from "../../reducers";
import { Category, Organization, SortMethod } from "../../types";
import { SessionState } from "../../store/session/types";
import moment from "moment";

interface SearchButtonProps extends RouteComponentProps {
  callback?: () => void;
  categories: Array<Category>;
  organizations: Array<Organization>;
  category?: Category;
  organization?: Organization;
  orderBy?: SortMethod;
  title?: string;
  tag?: string;
  from?: string;
  to?: string;
  keyword?: string;
  fullWidth?: boolean;
  session?: SessionState;
}

const SearchButton = (props: SearchButtonProps) => {

  let color: string = "#c41234"
  if(props.session && props.session.isLoggedIn  && props.session.selectedOrganization){
    color = props.session.selectedOrganization.color
  }

  return (
  <Button
    color={color}
    default
    disabled={!(!props.from || moment(props.from).isAfter(moment("1/1/2000")) && moment(props.from).isBefore(moment(moment().format("yyyy").toString() + "-12-31")))
    || !(!props.to || moment(props.to).isAfter(moment("1/1/2000")) && moment(props.to).isBefore(moment(moment().format("yyyy").toString() + "-12-31")))
    ||  moment(props.from).isAfter(props.to)}
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
)};

const mapStateToProps = (rootState: RootState) => {
  let from
  if (rootState.search.from && moment(rootState.search.from).format("yyyy-MM-DD").toString() != "Invalid date") {
    from = moment(rootState.search.from).format("yyyy-MM-DD").toString()
      
  } else {
    from = ""
  }
  let to
  if (rootState.search.to && moment(rootState.search.to).format("yyyy-MM-DD").toString() != "Invalid date") {
    to = moment(rootState.search.to).format("yyyy-MM-DD").toString()
      
  } else {
    to = ""
  }
  return {
    categories: rootState.common.categories,
    organizations: rootState.common.organizations,
    title: rootState.search.title,
    tag: rootState.search.tag,
    category: rootState.search.category,
    orderBy: rootState.search.orderBy,
    from: from,
    to: to,
    organization: rootState.search.organization,
    keyword: rootState.search.keyword,
    session: rootState.session,
  };
};

export default hot(module)(connect(mapStateToProps)(withRouter(SearchButton)));
