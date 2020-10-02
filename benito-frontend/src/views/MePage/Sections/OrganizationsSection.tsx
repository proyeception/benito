import React from "react";
import { hot } from "react-hot-loader";
import { Person } from "../../../types";

type OrganizationsSectionProps = {
  user: Person;
};

const OrganizationsSection = (props: OrganizationsSectionProps) => (
  <div>Organizaciones</div>
);

export default hot(module)(OrganizationsSection);
