import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import axios, { AxiosRequestConfig } from "axios";
import { benitoHost } from "../../config";

type Props = {};

const Login = (_: Props) => (
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

export default hot(module)(Login);
