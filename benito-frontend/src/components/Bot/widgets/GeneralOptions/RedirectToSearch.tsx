import React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import { RootState } from "../../../../reducers";
import { SessionState } from "../../../../store/session/types";
import { SearchParams, Category, SortMethod } from "../../../../types";
import { buildQueryParams } from "../../../../functions/search";

interface GeneralOptionsProps extends RouteComponentProps {
  session?: SessionState;
  selectedCategory: string;
  categories: Array<Category>;
}

const RedirectToProject = (props: GeneralOptionsProps | any) => {
  let categoryId: string = props.selectedCategory
  let category: Category = props.categories.find((c: Category) => c.id == categoryId)
  
  let searchParams: SearchParams = {
    category: category.tagName,
    orderBy: SortMethod.ViewsDesc
  }
  
  return <Redirect push to={{ pathname: `/search`, search: buildQueryParams(searchParams) }} />;
};

const mapStateToProps = (rootState: RootState) => {

  return {
    session: rootState.session,
    categories: rootState.common.categories,
  };
};

export default hot(module)(connect(mapStateToProps)(withRouter(RedirectToProject)));
