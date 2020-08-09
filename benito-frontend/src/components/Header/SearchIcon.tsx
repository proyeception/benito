import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";

const searchIconUrl =
  "https://cdn2.iconfinder.com/data/icons/font-awesome/1792/search-512.png";

const SearchIcon = (_: any) => (
  <img src={searchIconUrl} className="qui-search-icon invert-colors" />
);

export default hot(module)(SearchIcon);
