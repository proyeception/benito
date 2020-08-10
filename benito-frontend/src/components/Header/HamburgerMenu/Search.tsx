import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { updateProjects } from "../../../actions/search";
import { fetchProjects } from "../../../functions/search";
import { searchIconUrl } from "./constants";
import store from "../../../store";
import { toggleHamburgerButton } from "../../../actions/common";
import { withRouter } from "react-router-dom";
import { RootState } from "../../../reducers";
import { connect } from "react-redux";
import NameInput from "../../Common/NameInput";

const Search = (_: any) => (
  <div className="container-fluid qui-mobile-search-container">
    <div className="row no-gutters">
      <div className="col-11" style={{ marginLeft: "-15px" }}>
        <NameInput className="qui-mobile-search" placeholder="Buscar" />
      </div>
      <div
        className="col-1 center qui-search-icon-button"
        style={{ marginRight: "-15px" }}
      >
        <img
          src={searchIconUrl}
          className="qui-search-icon-button"
          onClick={() => {
            fetchProjects()
              .then((res) => res.data)
              .then((projects) => store.dispatch(updateProjects(projects)))
              .then(() => store.dispatch(toggleHamburgerButton(false)))
              .catch(console.error);
          }}
        />
      </div>
    </div>
  </div>
);

const mapStateToProps = (rootState: RootState) => {
  return rootState.search;
};

export default hot(module)(withRouter(connect(mapStateToProps)(Search)));
