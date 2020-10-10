import { TextField } from "@material-ui/core";
import React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { updateTitle } from "../../actions/search";
import { RootState } from "../../reducers";
import store from "../../store";

type TitleInputProps = {
  title?: string;
  variant?: "outlined" | "filled" | "standard";
};

const TitleInput = (props: TitleInputProps) => (
  <TextField
    label="Título"
    fullWidth
    onChange={(e) => store.dispatch(updateTitle(e.target.value))}
    value={props.title}
    variant={props.variant}
  />
);

const mapStateToProps = (rootState: RootState) => {
  return {
    title: rootState.search.title,
  };
};

export default hot(module)(connect(mapStateToProps)(TitleInput));
