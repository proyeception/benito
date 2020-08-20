import React, { CSSProperties } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { buildQueryParams } from "../../functions/search";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { SearchState } from "../../store/search/types";
import { RootState } from "../../reducers";
import { connect } from "react-redux";

interface Props extends RouteComponentProps {
  className: string;
  onSuccess?: () => void;
  text?: string;
  style?: CSSProperties;
  searchState: SearchState;
}

const SearchButton = (props: Props) => {
  const search = () => {
    props.history.push({
      pathname: "/search",
      search: buildQueryParams(props.searchState),
    });
    if (props.onSuccess) props.onSuccess();
  };

  return (
    <button
      type="button"
      className={props.className}
      style={props.style}
      onClick={search}
    >
      <span>{props.text ? props.text : "Buscar"}</span>
    </button>
  );
};

const mapStateToProps = (rootState: RootState) => {
  return { searchState: rootState.search };
};

export default hot(module)(connect(mapStateToProps)(withRouter(SearchButton)));
