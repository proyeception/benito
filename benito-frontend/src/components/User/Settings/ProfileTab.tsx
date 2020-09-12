import React from "react";
import { hot } from "react-hot-loader";
import { Person } from "../../../types";
import "./styles.scss";

type Props = {
  user: Person;
};

const ProfileTab = (_: Props) => <div></div>;

export default hot(module)(ProfileTab);
