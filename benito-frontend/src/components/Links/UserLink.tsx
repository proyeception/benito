import React from "react";
import { hot } from "react-hot-loader";
import { Link } from "react-router-dom";
import { Role } from "../../types";
import classNames from "classnames";
import { mapRoleToCollection } from "../../functions/user";

type UserLinkProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
  role: Role;
};

const UserLink = (props: UserLinkProps) => (
  <Link
    className={classNames("normalize-link", props.className)}
    to={`/${mapRoleToCollection(props.role)}/${props.id}`}
  >
    {props.children}
  </Link>
);

export default hot(module)(UserLink);
