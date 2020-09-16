import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Person } from "../../types";
import Project from "./Project";
import Separator from "../Common/Separator";
import OneByOne from "../Common/OneByOne";
import SlideIn from "../Common/SlideIn";

type Props = {
  user: Person;
};

const ProjectsTab = (props: Props) => {
  return (
    <div>
      <Separator display="d-block d-md-none" color="light" />
      <div className="container">
        <div className="font-size-24 font-size-36-md mt-4 mt-md-0 mb-3 mb-md-5">
          Proyectos
        </div>
        <OneByOne
          containerClassName="row"
          timeout={150}
          elements={props.user.projects.map((p, idx) => (
            <SlideIn className="col-12 col-md-6 mb-5" key={idx}>
              <Project project={p} />
            </SlideIn>
          ))}
        />
      </div>
    </div>
  );
};

export default hot(module)(ProjectsTab);
