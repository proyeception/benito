import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { SearchAction, SearchState } from "../../store/search/types";
import ReactDatePicker from "react-datepicker";
import store from "../../store";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

type Props = {
  className?: string;
  action: (e: String) => SearchAction;
  mapper: (state: SearchState) => String;
  search: SearchState;
};

const DateInput = (props: Props) => (
  <div>
    <ReactDatePicker
      className={`form-control ${props.className ? props.className : ""}`}
      onChange={(date) => {
        store.dispatch(props.action(moment(date).format("YYYY-MM-DD")));
      }}
      value={props.mapper(props.search).valueOf()}
    />
  </div>
);

const mapStateToProps = (rootState: RootState) => rootState;

export default hot(module)(connect(mapStateToProps)(DateInput));
