import React, { CSSProperties } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { fetchProjects, buildQueryParams } from "../../functions/search";
import store from "../../store";
import { updateProjects } from "../../actions/search";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface Props extends RouteComponentProps {
  className: string;
  onSuccess?: () => void;
  text?: string;
  style?: CSSProperties;
}

const SearchButton = (props: Props) => {
  const search = () => {
    props.history.push({
      pathname: "/search",
      search: buildQueryParams(store.getState().search),
    });
    fetchProjects()
      .then((res) => res.data)
      .then((projects) => store.dispatch(updateProjects(projects)))
      .then(() => (props.onSuccess ? props.onSuccess() : {}))
      .catch(console.error);
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

export default hot(module)(withRouter(SearchButton));
