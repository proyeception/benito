import React from "react";
import { hot } from "react-hot-loader";
import { Person, Role } from "../../../types";

type SettingsSectionProps = {
  user: Person;
  role: Role;
};

const SettingsSection = (props: SettingsSectionProps) => (
  <div>Configuración</div>
);

export default hot(module)(SettingsSection);
