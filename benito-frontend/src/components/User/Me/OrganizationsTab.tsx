import React from "react";
import { hot } from "react-hot-loader";
import { Person } from "../../../types";
import "./styles.scss";

type Props = {
  user: Person;
};

const OrganizationsTab = (props: Props) => (
  <div className="container pt-4">
    {props.user.organizations.map((o, idx) => (
      <div key={idx}>{o.displayName}</div>
    ))}
  </div>
);

export default hot(module)(OrganizationsTab);
