import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";

type Props = {};

const Organizations = (_: Props) => (
  <div>
    <div className="font-weight-bold font-size-18-md">Organizaciones</div>
    <div>Saraza</div>
  </div>
);

export default hot(module)(Organizations);
