import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Project, ProjectEditionRole } from "../../types";
import { noImageAvailableHorizontal } from "../../constants";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { withRouter, RouteComponentProps } from "react-router-dom";
import store from "../../store";
import { openProjectEdition } from "../../actions/project";

interface Props extends RouteComponentProps {
  project: Project;
  maxHeight: Number;
  minHeight: Number;
  display: String;
  editionRole: ProjectEditionRole;
}

const Title = (props: Props) => {
  const [height, setHeight] = useState(props.maxHeight);
  const handleScroll = () => {
    if (window.pageYOffset >= props.minHeight) {
      setHeight(props.minHeight);
    } else {
      setHeight(props.maxHeight);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{ zIndex: 999 }}
      className={`qui-sticky-title ${props.display}`}
    >
      <div
        className="qui-blurred-image"
        style={{
          backgroundImage: `url(${
            props.project.posterUrl || noImageAvailableHorizontal
          })`,
          height: props.minHeight.valueOf(),
        }}
      >
        <div
          className="qui-backdrop d-flex justify-content-between justify-content-md-start font-size-24 font-size-45-md qui-project-title"
          style={{ height: props.minHeight.valueOf() }}
        >
          <div className="ml-3 ml-md-4">{props.project.title} </div>

          <div className="mr-3 ml-md-5">
            {" "}
            {props.editionRole == "AUTHOR" ||
            props.editionRole == "SUPERVISOR" ? (
              <FontAwesomeIcon
                className="font-size-24 font-size-36-md cursor-pointer"
                onClick={() => {
                  store.dispatch(openProjectEdition(props.project));
                  props.history.push(`/projects/${props.project.id}/edit`);
                }}
                icon={faEdit}
              />
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => {
  return {
    editionRole: rootState.project.editionRole,
  };
};

export default hot(module)(withRouter(connect(mapStateToProps)(Title)));
