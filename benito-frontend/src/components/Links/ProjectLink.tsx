import React from "react";
import { hot } from "react-hot-loader";
import { Link } from "react-router-dom";
import classNames from "classnames";

type ProjectLinkProps = {
  children: React.ReactNode;
  id: string;
  className?: string;
};

const ProjectLink = (props: ProjectLinkProps) => (
  <Link
    to={`/projects/${props.id}`}
    className={classNames("normalize-link", props.className)}
  >
    {props.children}
  </Link>
);

export default hot(module)(ProjectLink);
