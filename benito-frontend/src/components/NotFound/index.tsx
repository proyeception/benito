import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";

const NotFound = (_: any) => (
  <div style={{ fontSize: "56px", height: "500px" }} className="center">
    Oops, no encontramos lo que estabas buscando :(
  </div>
);

export default hot(module)(NotFound);
