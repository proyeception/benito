import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import axios, { AxiosRequestConfig } from "axios";
import { benitoHost } from "../../config";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import { clearSession } from "../../functions/session";

type Props = {
  token?: String;
  userId?: String;
  profilePicture?: String;
  isLoggedIn?: Boolean;
};

const Login = (props: Props) => {
  if (props.isLoggedIn) {
    return (
      <div onClick={() => clearSession(props.token)}>
        Bien ahí, papá, estás loggeado
      </div>
    );
  }

  return (
    <div
      onClick={() => {
        let config: AxiosRequestConfig = {
          method: "GET",
          url: `${benitoHost}/benito/auth`,
        };
        axios
          .request<String>(config)
          .then((res) => res.data)
          .then((url) => (window.location.href = url.valueOf()))
          .catch(console.error);
      }}
    >
      Hacé click acá para logearte papá
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => {
  return rootState.session;
};

export default hot(module)(connect(mapStateToProps)(Login));
