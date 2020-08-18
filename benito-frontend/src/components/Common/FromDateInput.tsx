import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { updateFromDate } from "../../actions/search";
import DateInput from "./DateInput";

type Props = {
  className?: string;
  placeholder?: string;
};

const FromDateInput = (props: Props) => (
  <DateInput
    className={props.className}
    action={updateFromDate}
    mapper={(search) => search.fromDate}
    placeholder="Desde"
  />
);

export default hot(module)(FromDateInput);
