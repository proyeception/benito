import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import User from ".";
import { RouteChildrenProps } from "react-router-dom";

type MatchParams = {
  userId: string;
};

interface Props extends RouteChildrenProps<MatchParams> {}

const Supervisor = (props: Props) => (
  <User collection="supervisors" {...props} />
);

export default hot(module)(Supervisor);
