import React from "react";
import { hot } from "react-hot-loader";
import { Link } from "react-router-dom";

type SupervisorLinkProps = {
  id: string;
  children: React.ReactNode;
};

const SupervisorLink = (props: SupervisorLinkProps) => (
  <Link to={`/supervisors/${props.id}`}>{props.children}</Link>
);

export default hot(module)(SupervisorLink);
