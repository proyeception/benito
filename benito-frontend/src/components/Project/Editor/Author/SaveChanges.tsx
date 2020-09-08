import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { updateContent } from "../../../../functions/project";

type Props = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  title?: String;
  description?: String;
  extraContent?: String;
  id: String;
};

const SaveChanges = (props: Props) => (
  <div
    className={props.className}
    onClick={() => {
      props.onClick?.apply(2);

      updateContent(
        props.title,
        props.description,
        props.extraContent,
        props.id
      )
        .then(console.log)
        .catch(console.error);
    }}
  >
    {props.children}
  </div>
);

export default hot(module)(SaveChanges);
