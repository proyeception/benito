import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";

type Props = {
  display: String;
  marginLeft?: Number;
  marginRight?: Number;
  color?: "primary" | "light" | undefined;
};

const Separator = (props: Props) => (
  <hr
    className={`${props.display} ${
      props.color ? `qui-separator-${props.color}` : "qui-separator-primary"
    } ${props.marginLeft !== undefined ? `ml-${props.marginLeft}` : "ml-2"} ${
      props.marginRight !== undefined ? `mr-${props.marginRight}` : "mr-2"
    }`}
  />
);

export default hot(module)(Separator);
