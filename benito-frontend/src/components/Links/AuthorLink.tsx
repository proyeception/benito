import React from "react";
import { hot } from "react-hot-loader";
import UserLink from "./UserLink";

type AuthorLinkProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
};

const AuthorLink = (props: AuthorLinkProps) => (
  <UserLink role="AUTHOR" {...props} />
);

export default hot(module)(AuthorLink);
