import React, { CSSProperties } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { buildQueryParams, Params } from "../../functions/search";
import { RouteComponentProps, withRouter } from "react-router-dom";
import store from "../../store";

interface Props extends RouteComponentProps {
  className: string;
  onSuccess?: () => void;
  text?: string;
  style?: CSSProperties;
  onClick?: () => void;
  params?: Params;
}

const SearchButton = (props: Props) => {
  const search = () => {
    props.history.push({
      pathname: "/search",
      search: buildQueryParams(props.params || store.getState().search),
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

export default hot(module)(withRouter(SearchButton));
