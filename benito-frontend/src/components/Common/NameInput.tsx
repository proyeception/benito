import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { updateName } from "../../actions/search";
import SearchInput from "./SearchInput";

type Props = {
  className?: string;
  placeholder?: string;
};

const NameInput = (props: Props) => (
  <SearchInput
    className={props.className}
    placeholder={props.placeholder}
    action={updateName}
    mapper={(search) => search.name}
  />
);

export default hot(module)(NameInput);
