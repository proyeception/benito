import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Project } from "../../types";
import moment from "moment";
import Separator from "../Common/Separator";
import { Link } from "react-router-dom";

type Props = {
  project: Project;
};

const Details = (props: Props) => {
  return (
    <div className="col-md-6 qui-vertical-separator">
      <div className="qui-project-subtitle font-weight-100 font-size-13 font-size-24-md">
        Detalles
      </div>
      <div className="row pl-md-3 pr-md-3 justify-content-around">
        <div className="col-md-6 mt-2">
          <div className="qui-summary qui-font-text font-size-11 font-size-16-md">
            Fecha de publicación
          </div>
        </div>
        <div className="col-12 col-md-6 mt-md-2">
          <div className="qui-summary qui-font-text font-weight-light font-size-11 font-size-16-md text-md-right">
            {moment(props.project.creationDate).format("DD-MM-YYYY")}
          </div>
        </div>
        <div className="col-12 col-md-6 mt-2">
          <div className="qui-summary qui-font-text font-size-11 font-size-16-md">
            Autores
          </div>
        </div>
        <div className="col-12 col-md-6 mt-md-2">
          <div className="qui-summary qui-font-text font-weight-light font-size-11 font-size-16-md text-md-right">
            {props.project.authors.length == 0 ? (
              <div></div>
            ) : (
              props.project.authors
                .map<React.ReactNode>((a, idx) => (
                  <Link key={idx} to={`/authors/${a.id}`}>
                    <span>{a.fullName}</span>
                  </Link>
                ))
                .reduce((prev, curr) => [prev, ", ", curr])
            )}
          </div>
        </div>
        <div className="col-12 col-md-6 mt-2">
          <div className="qui-summary qui-font-text font-size-11 font-size-16-md">
            Etiquetas
          </div>
        </div>
        <div className="col-12 col-md-6 mt-md-2">
          <div className="qui-summary qui-font-text font-size-11 font-size-16-md font-weight-light text-md-right">
            {props.project.tags.join(", ")}
          </div>
        </div>
      </div>
      <Separator display="d-block d-md-none" />
    </div>
  );
};

export default hot(module)(Details);
