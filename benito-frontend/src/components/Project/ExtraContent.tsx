import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import ReactMarkdown from "react-markdown";
import Separator from "./Separator";
import { Project } from "../../types";

type Props = {
  project: Project;
};

function Image(props: any) {
  return <img {...props} style={{ maxWidth: "100%" }} />;
}

const ExtraContent = (props: Props) => {
  if (props.project.extraContent != "") {
    return (
      <div className="col-md-12 mt-4">
        <Separator display="d-block d-md-none" />
        <div className="qui-project-subtitle font-size-13 font-size-24-md">
          Contenido adicional
        </div>
        <ReactMarkdown
          className="font-weight-light pl-md-3 pr-md-3"
          source={props.project.extraContent.valueOf()}
          renderers={{ image: Image }}
        />
      </div>
    );
  }

  return <div></div>;
};

export default hot(module)(ExtraContent);
