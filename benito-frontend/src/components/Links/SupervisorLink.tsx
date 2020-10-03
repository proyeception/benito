import React from "react";
import { hot } from "react-hot-loader";
import UserLink from "./UserLink";

type SupervisorLinkProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
};

const SupervisorLink = (props: SupervisorLinkProps) => (
  <UserLink role="SUPERVISOR" {...props} />
);

export default hot(module)(SupervisorLink);
