import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Person } from "../../types";

type Props = {
  user: Person;
};

const Projects = (_: Props) => (
  <div>
    <div className="font-size-36-md">Proyectos</div>
    <div></div>
  </div>
);

export default hot(module)(Projects);
