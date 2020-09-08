import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Project } from "../../../../types";

type Props = {
  project: Project;
};

const Image = (props: Props) => (
  <div>
    <div className="font-size-18 font-size-24-md font-weight-bolder pb-2">
      Imagen
    </div>
    <div className="center">
      <img className="w-100" src={props.project.posterUrl} />
    </div>
  </div>
);

export default hot(module)(Image);
