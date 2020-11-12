import { TextField } from "@material-ui/core";
import React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { updateTag } from "../../actions/search";
import { RootState } from "../../reducers";
import store from "../../store";

type TagInputProps = {
  tag?: string;
  variant?: "outlined" | "filled" | "standard";
};

const TagInput = (props: TagInputProps) => (
  <TextField
    label="Tag"
    fullWidth
    onChange={(e) => store.dispatch(updateTag(e.target.value.replace(/[^A-Za-z0-9áéíóúÁÉÍÓÚÜü ?!ñÑ¿¡]/, "")))}
    value={props.tag}
    variant={props.variant}
  />
);

const mapStateToProps = (rootState: RootState) => {
  return {
    tag: rootState.search.tag,
  };
};

export default hot(module)(connect(mapStateToProps)(TagInput));
