import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { hot } from "react-hot-loader";
import "./styles.scss";
import moment from "moment";
import { Project } from "../Search/ProjectSummary";

type Props = {
  project: Project;
};

function Image(props: any) {
  return <img {...props} style={{ maxWidth: "100%" }} />;
}

const MAX_POSTER_HEIGHT = 150;
const MIN_POSTER_HEIGHT = 60;

const ProjectInfo = (props: Props) => {
  const [height, setHeight] = useState(MAX_POSTER_HEIGHT);
  height;
  const handleScroll = () => {
    let scrollTop = window.scrollY;
    setHeight(Math.max(MIN_POSTER_HEIGHT, MAX_POSTER_HEIGHT - scrollTop));
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="ml-md-5 mr-md-5 mt-md-5">
      <div style={{ zIndex: 999 }} className="qui-sticky-title">
        <div
          className="qui-blurred-image"
          style={{
            backgroundImage: `url(${props.project.posterUrl})`,
            height: height,
          }}
        >
          <div
            className="qui-backdrop qui-project-title"
            style={{ height: height }}
          >
            {props.project.title}
          </div>
        </div>
      </div>

      <div className="container-fluid qui-box">
        <div className="row">
          <div className="col-md-12 mt-md-5 mb-md-4">
            <div className="qui-project-subtitle">Resumen</div>
            <div className="qui-summary qui-font-text mt-3">
              {props.project.description}
            </div>
            <hr className="d-block d-md-none qui-separator" />
          </div>
          <div className="col-md-6 qui-vertical-separator">
            <div className="qui-project-subtitle">Detalles</div>
            <div className="row">
              <div className="col-md-6 mt-2">
                <div className="qui-summary qui-font-text">
                  Fecha de publicación
                </div>
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
          </div>
          <div className="col-md-6">
            <div className="qui-project-subtitle">Documentación</div>
          </div>
          {props.project.extraContent != "" ? (
            <div className="col-md-12 mt-4">
              <div className="qui-project-subtitle">Contenido adicional</div>
              <ReactMarkdown
                source={props.project.extraContent}
                renderers={{ image: Image }}
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default hot(module)(ProjectInfo);
