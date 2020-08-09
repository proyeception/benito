import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import Brand from "./Brand";

const Header = (_: any) => (
  <div className="qui-header pt-3 pb-3">
    <div className="container">
      <div className="center qui-brand-col">
        <Brand />
      </div>
    </div>
  </div>
);

export default hot(module)(Header);
