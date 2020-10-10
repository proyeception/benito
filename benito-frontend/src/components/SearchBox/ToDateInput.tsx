import { KeyboardDatePicker } from "@material-ui/pickers";
import React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { updateToDate } from "../../actions/search";
import { RootState } from "../../reducers";
import store from "../../store";

type ToDateInputProps = {
  to?: Date;
  variant?: "dialog" | "inline" | "static";
  inputVariant?: "standard" | "outlined" | "filled";
};

const ToDateInput = (props: ToDateInputProps) => (
  <KeyboardDatePicker
    clearable={true}
    placeholder="08/04/2016"
    variant={props.variant}
    format="dd/MM/yyyy"
    label="Fin"
    value={props.to || null}
    onChange={(e) => {
      if (e) {
        store.dispatch(updateToDate(e));
      }
    }}
    inputProps={{
      variant: props.inputVariant,
    }}
  />
);

const mapStateToProps = (rootState: RootState) => {
  return {
    to: rootState.search.toDate,
  };
};

export default hot(module)(connect(mapStateToProps)(ToDateInput));
