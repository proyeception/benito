import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Link } from "react-router-dom";

const Brand = (_: any) => (
  <Link to="/" className="center" style={{ textDecoration: "none" }}>
    <div className="qui-brand-name font-weight-bold font-size-24 font-size-36-md text-center text-white">
      Proyectate
    </div>
  </Link>
);

export default hot(module)(Brand);
