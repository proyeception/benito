import { useState } from "react";
import {
  SuggestionsFetchRequested,
  OnSuggestionsClearRequested,
} from "react-autosuggest";

function useSuggestion<T>(
  baseValues: Array<T>,
  matcher: (t: T, value: String) => Boolean
): [Array<T>, SuggestionsFetchRequested, OnSuggestionsClearRequested] {
  const [suggestions, setSuggestions] = useState(baseValues);
  const getSuggestions = (value: String) => {
    return value.length == 0 ? [] : baseValues.filter((v) => matcher(v, value));
  };
  const onSuggestionsClearRequested: OnSuggestionsClearRequested = () =>
    setSuggestions([]);
  const onSuggestionsFetchRequested: SuggestionsFetchRequested = ({ value }) =>
    setSuggestions(getSuggestions(value));

  return [
    suggestions,
    onSuggestionsFetchRequested,
    onSuggestionsClearRequested,
  ];
}

export default useSuggestion;
