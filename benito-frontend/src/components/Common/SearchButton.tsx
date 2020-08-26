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
  onClick?: () => void;
}

const SearchButton = (props: Props) => {
  const search = () => {
    props.history.push({
      pathname: "/search",
      search: buildQueryParams(props.searchState),
    });
    props.onSuccess?.call({});
  };

  return (
    <button
      type="button"
      className={props.className}
      style={props.style}
      onClick={() => {
        props.onClick?.call({});
        search();
      }}
    >
      <span>{props.text ? props.text : "Buscar"}</span>
    </button>
  );
};

const mapStateToProps = (rootState: RootState) => {
  return { searchState: rootState.search };
};

export default hot(module)(connect(mapStateToProps)(withRouter(SearchButton)));
