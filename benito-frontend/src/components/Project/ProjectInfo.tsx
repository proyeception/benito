import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import moment from "moment";
import { Project } from "../Search/ProjectSummary";

type Props = {
  project: Project;
};

const ProjectInfo = (props: Props) => (

  <div>
    <div className="qui-blurred-image" style={{ backgroundImage: `url(${props.project.posterUrl})` }} >
      <div className="qui-backdrop">
        <p className="qui-project-title qui-font-title">
          {props.project.title}
        </p>
      </div>
    </div>
    <div className="row qui-border"></div>

    <div className="container-fluid qui-box">
      <div className="row">
        <div className="col-md-12">
          <div>

          </div>

          <div className="row qui-separator"></div>

          <div className="qui-project-subtitle">
            Resumen
      </div>

          <div className="row qui-summary qui-font-text mt-3">
            {props.project.description}
          </div>

          <div className="row qui-separator"></div>

          <div className="row container-fluid mt-5 ml-7">
            <div className="qui-column-50-with-border">
              <div className="qui-project-subtitle">
                Detalles
          </div>

              <div className="row">
                <div className="qui-column-50 qui-summary qui-font-text">
                  Fecha de publicacion
            </div>
                <div className="qui-column-50 qui-summary qui-font-text">
                  {moment(props.project.creationDate).format('DD-MM-YYYY')}
                </div>
              </div>

              <div className="row">
                <div className="qui-column-50 qui-summary qui-font-text">
                  Autores
            </div>
                <div className="qui-column-50 qui-summary qui-font-text">
                  {props.project.authors.map((a) => a.username).join(", ")}
                </div>
              </div>

              <div className="row">
                <div className="qui-column-50 qui-summary qui-font-text">
                  Tags
            </div>
                <div className="qui-column-50 qui-summary qui-font-text">
                  {props.project.tags.join(", ")}
                </div>
              </div>

            </div>

            <div className="qui-column-50">
              <div className="qui-project-subtitle">
                Documentacion
          </div>

              <div className="row">
                <div className="qui-column-50 qui-summary qui-font-text">
                  Poner los documentos con un Component
              </div>
              </div>
            </div>
          </div>

          <div className="row qui-separator"></div>

          <div className="qui-project-subtitle">
            Contenido adicional
      </div>

          <div className="row qui-summary qui-font-text mt-3">
            Poner el contenido adicional
      </div>


        </div>
      </div>
    </div>
  </div>
);

export default hot(module)(ProjectInfo);
