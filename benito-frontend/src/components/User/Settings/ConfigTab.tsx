import React from "react";
import { hot } from "react-hot-loader";
import { Person } from "../../../types";
import "./styles.scss";

type Props = {
  user: Person;
};

const ConfigTab = (_: Props) => <div>Coming soon</div>;

export default hot(module)(ConfigTab);
