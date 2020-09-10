import React, { useState } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Person } from "../../../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import Autosuggest from "react-autosuggest";
import useSuggestion from "../../../../hooks/useSuggestion";

type Props = {
  organizationUsers: Array<Person>;
  projectUsers: Array<Person>;
  collection: String;
};

const Authors = (props: Props) => {
  const [
    suggestions,
    onSuggestionsFetchRequested,
    onSuggestionsClearRequested,
  ] = useSuggestion(
    props.organizationUsers,
    (a, value) =>
      a.fullName.toLowerCase().slice(0, value.length) == value.toLowerCase()
  );
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="mt-1 mt-md-3">
      <div className="font-size-14 font-size-16-md font-weight-lighter">
        {props.projectUsers.map((a, idx) => (
          <div key={idx} className="mt-1 mb-1">
            <FontAwesomeIcon
              icon={faMinusCircle}
              color="red"
              className="mr-2"
            />{" "}
            {a.fullName}
          </div>
        ))}
      </div>
      <div className="font-size-16 font-size-18-md mt-3">
        Agregar {props.collection}
      </div>
      <div style={{ height: "52px" }} className="mt-2 mb-3">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          renderSuggestion={(e) => (
            <span
              className="suggestionContent h-100"
              style={{ backgroundImage: `url(${e.profilePicUrl})` }}
            >
              {e.fullName}
            </span>
          )}
          inputProps={{
            placeholder: `Ingresa para buscar los ${props.collection} de esta organización`,
            value: inputValue,
            onChange: (_, { newValue }) => setInputValue(newValue),
          }}
          getSuggestionValue={(s) => s.fullName.valueOf()}
        />
      </div>
    </div>
  );
};

export default hot(module)(Authors);
