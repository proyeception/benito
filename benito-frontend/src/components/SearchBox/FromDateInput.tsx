import { KeyboardDatePicker } from "@material-ui/pickers";
import React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { updateFromDate } from "../../actions/search";
import { RootState } from "../../reducers";
import store from "../../store";

type FromDateInputProps = {
  from?: Date;
  variant?: "dialog" | "inline" | "static";
  inputVariant?: "standard" | "outlined" | "filled";
};

const FromDateInput = (props: FromDateInputProps) => (
  <KeyboardDatePicker
    clearable={true}
    placeholder="08/04/2016"
    variant={props.variant}
    format="dd/MM/yyyy"
    label="Comienzo"
    value={props.from || null}
    onChange={(e) => {
      if (e) {
        store.dispatch(updateFromDate(e));
      }
    }}
    inputProps={{
      variant: props.inputVariant,
    }}
  />
);

const mapStateToProps = (rootState: RootState) => {
  return {
    from: rootState.search.fromDate,
  };
};

export default hot(module)(connect(mapStateToProps)(FromDateInput));
