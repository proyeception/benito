import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import SearchInput from "./SearchInput";
import { updateDocumentation } from "../../actions/search";

type Props = {
  className?: string;
  placeholder?: string;
};

const DocumentationInput = (props: Props) => (
  <SearchInput
    className={props.className}
    placeholder={props.placeholder}
    action={updateDocumentation}
    mapper={(search) => search.documentation}
  />
);

export default hot(module)(DocumentationInput);
