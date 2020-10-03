import React from "react";
import { hot } from "react-hot-loader";
import { Person } from "../../../types";

type SettingsSectionProps = {
  user: Person;
};

const SettingsSection = (props: SettingsSectionProps) => (
  <div>Configuración</div>
);

export default hot(module)(SettingsSection);
