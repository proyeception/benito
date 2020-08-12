import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { updateToDate } from "../../actions/search";
import DateInput from "./DateInput";

type Props = {
  className?: string;
  placeholder?: string;
};

const ToDateInput = (props: Props) => (
  <DateInput
    className={props.className}
    action={updateToDate}
    mapper={(search) => search.toDate}
  />
);

export default hot(module)(ToDateInput);
