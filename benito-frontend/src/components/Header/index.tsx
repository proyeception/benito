import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import SearchIcon from "./SearchIcon";
import Brand from "./Brand";
import UserIcon from "./UserIcon";

const Header = (_: any) => (
  <div className="qui-header container-fluid pt-3 pb-3">
    <div className="row justify-content-center">
      <div className="col col-sm-4 col-md-1 center d-sm-block d-md-none">
        <SearchIcon />
      </div>
      <div className="col col-sm-4 col-md-10 center qui-brand-col">
        <Brand />
      </div>
      <div className="col col-sm-4 col-md-1 center">
        <UserIcon />
      </div>
    </div>
  </div>
);

export default hot(module)(Header);
