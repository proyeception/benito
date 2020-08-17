import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Project } from "../../types";
import moment from "moment";
import Separator from "./Separator";

type Props = {
  project: Project;
};

const Details = (props: Props) => {
  return (
    <div className="col-md-6 qui-vertical-separator">
      <div className="qui-project-subtitle">Detalles</div>
      <div className="row">
        <div className="col-md-6 mt-2">
          <div className="qui-summary qui-font-text">Fecha de publicación</div>
        </div>
        <div className="col-12 col-md-6 mt-md-2">
          <div className="qui-summary qui-font-text">
            {moment(props.project.creationDate).format("DD-MM-YYYY")}
          </div>
        </div>
        <div className="col-12 col-md-6 mt-2">
          <div className="qui-summary qui-font-text">Autores</div>
        </div>
        <div className="col-12 col-md-6 mt-md-2">
          <div className="qui-summary qui-font-text">
            {props.project.authors.map((a) => a.fullName).join(", ")}
          </div>
        </div>
        <div className="col-12 col-md-6 mt-2">
          <div className="qui-summary qui-font-text">Etiquetas</div>
        </div>
        <div className="col-12 col-md-6 mt-md-2">
          <div className="qui-summary qui-font-text">
            {props.project.tags.join(", ")}
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default hot(module)(Details);
