import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import SearchInput from "./SearchInput";
import { updateKeyword } from "../../actions/search";

type Props = {
  className?: string;
  placeholder?: string;
};

const KeywordInput = (props: Props) => (
  <SearchInput
    className={props.className}
    placeholder={props.placeholder}
    action={updateKeyword}
    mapper={(search) => search.keyword}
  />
);

export default hot(module)(KeywordInput);
