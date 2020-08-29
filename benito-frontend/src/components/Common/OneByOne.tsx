import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";

type Props = {
  elements: Array<React.ReactNode>;
  timeout?: number;
  containerClassName?: string;
};

const OneByOne = (props: Props) => {
  const [nodes, setNodes] = useState([]);
  const timeout: number = props.timeout || 50;
  let index = 1;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNodes(props.elements.slice(0, index));
      index++;
    }, timeout);
    setTimeout(
      () => clearInterval(intervalId),
      (props.elements.length + 1) * timeout
    );
  }, []);
  return <div className={props.containerClassName}>{nodes}</div>;
};

export default hot(module)(OneByOne);
