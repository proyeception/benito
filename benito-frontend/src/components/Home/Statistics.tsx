import React, { useEffect } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import axios, { AxiosRequestConfig } from "axios";
import { benitoHost } from "../../config";
import store from "../../store";
import { updateProjectTotal } from "../../actions/home";
import { RootState } from "../../reducers";
import { connect } from "react-redux";

type Props = {
  total: Number;
};

const Statistics = (props: Props) => {
  useEffect(() => {
    let config: AxiosRequestConfig = {
      method: "GET",
      url: `${benitoHost}/benito/project-count`,
    };

    axios
      .request<{ total: Number }>(config)
      .then((res) => res.data)
      .then(({ total }) => store.dispatch(updateProjectTotal(total)))
      .catch(console.error);
  }, []);

  return props.total == null ? (
    <div></div>
  ) : (
    <div>
      <div>¡Más de {props.total} proyectos para ver!</div>
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => {
  return {
    total: rootState.home.projectTotal,
  };
};

export default hot(module)(connect(mapStateToProps)(Statistics));
