import React from "react";
import { hot } from "react-hot-loader";
import store from "../../store";
import { LoginAction } from "../../store/login/types";

type Props = {
  inputType: String;
  placeHolder: String;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => LoginAction;
  onErrorFeedback: String;
};

const Input = (props: Props) => (
  <div className="input-group mb-3">
    <input
      type={props.inputType.valueOf()}
      className="form-control"
      placeholder={props.placeHolder.valueOf()}
      aria-label={props.placeHolder.valueOf()}
      aria-describedby="basic-addon1"
      onChange={(it) => store.dispatch(props.onChange(it))}
      required
    />
    <div className="invalid-feedback">{props.onErrorFeedback}</div>
  </div>
);

export default hot(module)(Input);
