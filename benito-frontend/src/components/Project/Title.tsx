import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Project, ProjectEditionRole, ProjectEdition } from "../../types";
import { noImageAvailableHorizontal } from "../../constants";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import store from "../../store";
import { openProjectEdition, editTitle } from "../../actions/project";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {
  project: Project;
  maxHeight: Number;
  minHeight: Number;
  display: String;
  editionRole: ProjectEditionRole;
  isEditingProject: Boolean;
  edition: ProjectEdition;
}

const Title = (props: Props) => {
  const [height, setHeight] = useState(props.maxHeight);
  const handleScroll = () => {
    let scrollTop = window.scrollY;
    setHeight(
      Math.max(props.minHeight.valueOf(), props.maxHeight.valueOf() - scrollTop)
    );
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
          height: height.valueOf(),
        }}
      >
        <div
          className="qui-backdrop d-flex justify-content-between justify-content-md-start font-size-24 font-size-45-md qui-project-title"
          style={{ height: height.valueOf() }}
        >
          {props.isEditingProject ? (
            <input
              className="ml-3 ml-md-4 transparent-input"
              type="text"
              value={props.edition.title.valueOf()}
              onChange={(e) => store.dispatch(editTitle(e.currentTarget.value))}
            />
          ) : (
            <div className="ml-3 ml-md-4">{props.project.title} </div>
          )}
          {props.isEditingProject ? (
            <div />
          ) : (
            <div className="mr-3 ml-md-5">
              {" "}
              {props.editionRole == "AUTHOR" ||
              props.editionRole == "SUPERVISOR" ? (
                <FontAwesomeIcon
                  className="font-size-24 font-size-36-md cursor-pointer"
                  onClick={() =>
                    store.dispatch(openProjectEdition(props.project))
                  }
                  icon={faEdit}
                />
              ) : (
                <div />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => {
  return {
    editionRole: rootState.project.editionRole,
    isEditingProject: rootState.project.isEditing,
    edition: rootState.project.edition,
  };
};

export default hot(module)(withRouter(connect(mapStateToProps)(Title)));
