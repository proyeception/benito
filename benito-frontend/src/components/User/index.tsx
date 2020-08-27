import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import Separator from "../Project/Separator";
import Picture from "./Picture";
import Organizations from "./Organizations";
import SocialMedia from "./SocialMedia";
import Projects from "./Projects";

type Props = {
  collection: String;
};

const User = (_: Props) => {
  return (
    <div className="bg-white qui-user-profile">
      <div className="container pt-md-5 un-mb-md-1">
        <div className="row">
          <div className="col-12 col-md-3 pr-5">
            <Picture />
            <Separator display="d-block" marginRight={0} marginLeft={0} />
            <Organizations />
            <Separator display="d-block" marginRight={0} marginLeft={0} />
            <SocialMedia />
          </div>
          <div className="col-12 col-md-9 pl-5">
            <Projects />
          </div>
        </div>
      </div>
    </div>
  );
};

export default hot(module)(User);
