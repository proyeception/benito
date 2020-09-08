import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {
  id: String;
  className?: string;
  children: React.ReactNode;
}

const DiscardChanges = (props: Props) => (
  <div
    className={props.className}
    onClick={() => props.history.push(`/projects/${props.id}`)}
  >
    {props.children}
  </div>
);

export default hot(module)(withRouter(DiscardChanges));
