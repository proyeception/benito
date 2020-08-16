import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Project } from "../Search/ProjectSummary";

type Props = {
  project: Project;
  maxHeight: Number;
  minHeight: Number;
  display: String;
};

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
          backgroundImage: `url(${props.project.posterUrl})`,
          height: height.valueOf(),
        }}
      >
        <div
          className="qui-backdrop qui-project-title"
          style={{ height: height.valueOf() }}
        >
          {props.project.title}
        </div>
      </div>
    </div>
  );
};

export default hot(module)(Title);
