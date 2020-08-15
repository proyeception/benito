import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import * as spinner from "react-loader-spinner";

const Loader = (_: any) => (
  <spinner.default type="TailSpin" color="#6b3ca7" height={80} width={80} />
);

export default hot(module)(Loader);
