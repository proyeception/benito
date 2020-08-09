import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Category } from "../../../types";
import { RootState } from "../../../reducers";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { buildQueryParams } from "../../../functions/search";
import store from "../../../store";
import { toggleHamburgerButton } from "../../../actions/common";

interface Props extends RouteComponentProps {
  categories: Array<Category>;
}

const Categories = (props: Props) => (
  <div className="container-fluid mt-3">
    {props.categories.map((cat, idx) => {
      return (
        <div
          key={idx}
          className="font-weight-bold text-uppercase qui-hamburger-accordion-card-category mb-3 cursor-pointer"
          onClick={() => {
            store.dispatch(toggleHamburgerButton(false));
            props.history.push({
              pathname: "/search",
              search: buildQueryParams({ category: cat.tagName }),
            });
          }}
        >
          {cat.name}
        </div>
      );
    })}
  </div>
);

const mapStateToProps = (rootState: RootState) => {
  return { categories: rootState.common.categories };
};

export default hot(module)(withRouter(connect(mapStateToProps)(Categories)));
