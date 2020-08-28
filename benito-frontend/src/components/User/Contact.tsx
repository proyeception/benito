import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type Props = {
  icon: IconProp;
  text: String;
};

const Contact = (props: Props) => (
  <div className="font-size-14-md mt-md-3">
    <FontAwesomeIcon icon={props.icon} />
    {props.text}
  </div>
);

export default hot(module)(Contact);
