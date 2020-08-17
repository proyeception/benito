import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";

type Props = {
  iconUrl: String;
  alt: String;
  socialUrl: String;
};

const Social = (props: Props) => (
  <a href={props.socialUrl.valueOf()} target="_blank">
    <div className="col-3">
      <img
        src={props.iconUrl.valueOf()}
        alt={props.alt.valueOf()}
        className="qui-footer-social"
      />
    </div>
  </a>
);

export default hot(module)(Social);
