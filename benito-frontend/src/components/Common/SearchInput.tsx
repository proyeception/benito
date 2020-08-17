import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { SearchAction, SearchState } from "../../store/search/types";
import store from "../../store";
import { RootState } from "../../reducers";
import { connect } from "react-redux";

type Props = {
  className?: string;
  placeholder?: string;
  inputType?: string;
  action: (e: String) => SearchAction;
  mapper: (state: SearchState) => String;
  search: SearchState;
};

const SearchInput = (props: Props) => (
  <input
    placeholder={props.placeholder ? props.placeholder : ""}
    type={props.inputType ? props.inputType : "text"}
    className={`form-control ${props.className ? props.className : ""}`}
    value={props.mapper(props.search).valueOf()}
    onChange={(e) => store.dispatch(props.action(e.currentTarget.value))}
  />
);

const mapStateToProps = (rootState: RootState) => {
  return { search: rootState.search };
};

export default hot(module)(connect(mapStateToProps)(SearchInput));
