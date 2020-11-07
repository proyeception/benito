import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { updateFromDate } from "../../actions/search";
import { RootState } from "../../reducers";
import store from "../../store";
import { grey } from "@material-ui/core/colors";
import moment from "moment";

type FromDateInputProps = {
  from?: string;
  variant?: "dialog" | "inline" | "static";
  inputVariant?: "standard" | "outlined" | "filled";
};

const theme = createMuiTheme({
  palette: {
    primary: grey,
  },
});

const FromDateInput = (props: FromDateInputProps) => (
  <ThemeProvider theme={theme}>
    <KeyboardDatePicker
      clearable={true}
      placeholder="2016"
      variant={props.variant}
      format="yyyy"
      label="Comienzo"
      value={props.from || null}
      maxDate={moment(moment().format("yyyy").toString() + "-12-31")}
      minDate={moment("1/1/2000")}
      views={["year"]}
      onChange={(e) => {
        if (e && moment(e).format("yyyy-MM-DD").toString() != "Invalid date") {
          store.dispatch(
            updateFromDate(
              moment(e).add(1, "days").format("yyyy-MM-DD").toString()
            )
          );
        } else {
          store.dispatch(updateFromDate(""));
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
    from: rootState.search.from,
  };
};

export default hot(module)(connect(mapStateToProps)(FromDateInput));
