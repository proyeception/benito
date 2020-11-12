import { TextField } from "@material-ui/core";
import React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { updateKeyword } from "../../actions/search";
import { RootState } from "../../reducers";
import store from "../../store";

type KeywordInputProps = {
  keyword?: string;
  variant?: "outlined" | "filled" | "standard";
};

const KeywordInput = (props: KeywordInputProps) => (
  <TextField
    label="Palabra clave"
    fullWidth
    onChange={(e) => store.dispatch(updateKeyword(e.target.value.replace(/[^A-Za-z0-9áéíóúÁÉÍÓÚÜü ?!ñÑ¿¡]/, "")))}
    value={props.keyword}
    variant={props.variant}
  />
);

const mapStateToProps = (rootState: RootState) => {
  return {
    keyword: rootState.search.keyword,
  };
};

export default hot(module)(connect(mapStateToProps)(KeywordInput));
