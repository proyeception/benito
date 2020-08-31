import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import axios, { AxiosRequestConfig } from "axios";
import { benitoHost } from "../../config";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import store from "../../store";
import { resetUserSession } from "../../actions/session";
import Cookies from "js-cookie";

type Props = {
  token?: String;
  userId?: String;
  profilePicture?: String;
  isLoggedIn?: Boolean;
};

const Login = (props: Props) => {
  if (props.isLoggedIn) {
    return (
      <div
        onClick={() => {
          axios.delete(`${benitoHost}/benito/session`, {
            headers: { "x-qui-token": props.token },
          });
          store.dispatch(resetUserSession());
          Cookies.remove("x-qui-token");
          localStorage.removeItem("x-qui-token");
        }}
      >
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
