import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import User from ".";
import { RouteChildrenProps } from "react-router-dom";

type MatchParams = {
  userId: string;
};

interface Props extends RouteChildrenProps<MatchParams> {
  collection: String;
}

const Student = (props: Props) => <User collection="authors" {...props} />;

export default hot(module)(Student);
