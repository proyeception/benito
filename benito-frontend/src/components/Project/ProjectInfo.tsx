import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";

export type ProjectData = {
    id: String;
    title: String;
    description: String;
    posterUrl: string;
    authors: Array<Person>;
    creationDate: Date;
    tags: Array<String>
  };
  
  type Person = {
    username: String;
    fullName: String;
    profileUrl: String;
  };
  
  type Props = {
    project: ProjectData;
  };

const ProjectInfo = (props: Props) => (
    <div className="row container-fluid mt-5">
      <div className="col-md-12">
        <div className="qui-project-title"></div>
        <div className="text-mask">
          {props.project.title}
        </div>
        <div className="row qui-separator"></div>
        <div className="row qui-border"></div>
        <div className="row qui-separator"></div>

        <div><h3>Resumen</h3></div>

        <div className="row qui-summary qui-font-text mt-3">
          {props.project.description}
        </div>

        <div className="row qui-separator"></div>

        <div className="row container-fluid mt-5 ml-7">
          <div className="qui-column-50-with-border">
            <h3>Detalles</h3>

            <div className="row">
              <div className="qui-column-50">
                <h6>Fecha de publicacion</h6>
              </div>
              <div className="qui-column-50">
                {props.project.creationDate}
              </div>
            </div>

            <div className="row">
              <div className="qui-column-50">
                <h6>Autores</h6>
              </div>
              <div className="qui-column-50">
                {props.project.authors.map((a) => a.username).join(", ")}
              </div>
            </div>

            <div className="row">
              <div className="qui-column-50">
                <h6>Tags</h6>
              </div>
              <div className="qui-column-50">
                {props.project.tags.join(", ")}
              </div>
            </div>

          </div>
          <div className="qui-column-50 col-md-3">
            <h3>Documentacion</h3>
            <div className="qui-column col-md-20">
                Poner los documentos con un Component
            </div>
          </div>
        </div>

        <div className="row qui-separator"></div>

        <div className="row container-fluid mt-5 ml-7">
          <div className="qui-column">
            <h3>Video</h3>
            <div className="qui-column-50">
              Poner el atributo de descripcion del video
            </div>
            <div className="qui-column-50">
              Poner el videito
            </div>
          </div>
        </div> 


      </div>
    </div>
  );

  export default hot(module)(ProjectInfo);