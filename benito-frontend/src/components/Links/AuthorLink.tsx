import React from "react";
import { hot } from "react-hot-loader";
import { Link } from "react-router-dom";

type AuthorLinkProps = {
  id: string;
  children: React.ReactNode;
};

const AuthorLink = (props: AuthorLinkProps) => (
  <Link className="normalize-link" to={`/authors/${props.id}`}>
    {props.children}
  </Link>
);

export default hot(module)(AuthorLink);
