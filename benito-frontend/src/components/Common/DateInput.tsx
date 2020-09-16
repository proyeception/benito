import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { SearchAction, SearchState } from "../../store/search/types";

import { RootState } from "../../reducers";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  className?: string;
  action: (e: String) => SearchAction;
  mapper: (state: SearchState) => String;
  search: SearchState;
  placeholder?: String;
};

const DateInput = (_: Props) => (
  <div>

  </div>
);

const mapStateToProps = (rootState: RootState) => rootState;

export default hot(module)(connect(mapStateToProps)(DateInput));
