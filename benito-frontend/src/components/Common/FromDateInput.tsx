import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import SearchInput from "./SearchInput";
import { updateFromDate } from "../../actions/search";

type Props = {
  className?: string;
  placeholder?: string;
};

const FromDateInput = (props: Props) => (
  <SearchInput
    className={props.className}
    placeholder={props.placeholder}
    action={updateFromDate}
    mapper={(search) => search.fromDate}
  />
);

export default hot(module)(FromDateInput);
