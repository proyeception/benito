import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Link } from "react-router-dom";

const searchIconUrl =
  "https://cdn2.iconfinder.com/data/icons/font-awesome/1792/search-512.png";

const SearchIcon = (_: any) => (
  <Link to="/search">
    <img src={searchIconUrl} className="qui-search-icon invert-colors" />
  </Link>
);

export default hot(module)(SearchIcon);
