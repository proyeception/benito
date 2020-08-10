import React, { useState } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { fetchProjects, buildQueryParams } from "../../functions/search";
import store from "../../store";
import { updateProjects } from "../../actions/search";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface Props extends RouteComponentProps {
  className: string;
  onSuccess: () => void;
  text?: string;
}

const SearchButton = (props: Props) => {
  const [loading, setLoading] = useState(false);

  const search = () => {
    setLoading(true);
    fetchProjects()
      .then((res) => res.data)
      .then((projects) => store.dispatch(updateProjects(projects)))
      .then(() => setLoading(false))
      .then(() =>
        props.history.push({
          pathname: "/search",
          search: buildQueryParams(store.getState().search),
        })
      )
      .then(props.onSuccess)
      .catch(console.error);
  };

  return (
    <button type="button" className={props.className} onClick={search}>
      <span hidden={loading.valueOf()}>
        {props.text ? props.text : "Buscar"}
      </span>
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
        hidden={!loading.valueOf()}
      />
    </button>
  );
};

export default hot(module)(withRouter(SearchButton));
