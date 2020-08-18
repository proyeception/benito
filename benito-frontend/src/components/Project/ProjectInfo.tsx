import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Project } from "../../types";
import Title from "./Title";
import Summary from "./Summary";
import Details from "./Details";
import Documents from "./Documents";
import ExtraContent from "./ExtraContent";

type Props = {
  project: Project;
};

const MAX_DESKTOP_HEIGHT = 300;
const MIN_DESKTOP_HEIGHT = 100;
const MAX_MOBILE_HEIGHT = 150;
const MIN_MOBILE_HEIGHT = 60;

const ProjectInfo = (props: Props) => {
  return (
    <div className="ml-md-5 mr-md-5 mt-md-5">
      <Title
        project={props.project}
        maxHeight={MAX_DESKTOP_HEIGHT}
        minHeight={MIN_DESKTOP_HEIGHT}
        display="d-none d-md-block"
      />
      <Title
        project={props.project}
        maxHeight={MAX_MOBILE_HEIGHT}
        minHeight={MIN_MOBILE_HEIGHT}
        display="d-block d-md-none"
      />
      <div className="container-fluid qui-box">
        <div className="row">
          <Summary project={props.project} />
          <Details project={props.project} />
          <Documents project={props.project} />
          <ExtraContent project={props.project} />
        </div>
      </div>
    </div>
  );
};

export default hot(module)(ProjectInfo);
