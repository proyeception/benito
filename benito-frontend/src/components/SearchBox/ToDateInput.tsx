import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { updateToDate } from "../../actions/search";
import { RootState } from "../../reducers";
import store from "../../store";
import { grey } from "@material-ui/core/colors";
import moment from "moment";

type ToDateInputProps = {
  to?: string;
  variant?: "dialog" | "inline" | "static";
  inputVariant?: "standard" | "outlined" | "filled";
};

const theme = createMuiTheme({
  palette: {
    primary: grey,
  },
});

const ToDateInput = (props: ToDateInputProps) => (
  <ThemeProvider theme={theme}>
  <KeyboardDatePicker
    clearable={true}
    placeholder="08/04/2016"
    variant={props.variant}
    format="dd/MM/yyyy"
    label="Fin"
    value={props.to || null}
    onChange={(e) => {
      if (e && moment(e).format("yyyy-MM-DD").toString() != 'Invalid date') {
        store.dispatch(updateToDate(moment(e).add(1, 'days').format("yyyy-MM-DD").toString()));
      } else {
        store.dispatch(updateToDate(""));
      }
    }}
    inputProps={{
      variant: props.inputVariant,
    }}
  />
  </ThemeProvider>
);

const mapStateToProps = (rootState: RootState) => {
  return {
    to: rootState.search.to,
  };
};

export default hot(module)(connect(mapStateToProps)(ToDateInput));
