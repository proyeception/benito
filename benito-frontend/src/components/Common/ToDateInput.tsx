import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import SearchInput from "./SearchInput";
import { updateToDate } from "../../actions/search";

type Props = {
  className?: string;
  placeholder?: string;
};

const ToDateInput = (props: Props) => (
  <SearchInput
    className={props.className}
    placeholder={props.placeholder}
    action={updateToDate}
    mapper={(search) => search.toDate}
  />
);

export default hot(module)(ToDateInput);
