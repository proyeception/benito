import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Link } from "react-router-dom";

const searchIconUrl =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Magnifying_glass_icon.svg/490px-Magnifying_glass_icon.svg.png";

const SearchIcon = (_: any) => (
  <Link to="/search">
    <img src={searchIconUrl} className="qui-search-icon invert-colors" />
  </Link>
);
export default hot(module)(SearchIcon);
