import React, { useState } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Person } from "../../../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import Autosuggest from "react-autosuggest";
import useSuggestion from "../../../../hooks/useSuggestion";

type Props = {
  organizationAuthors: Array<Person>;
  organizationSupervisors: Array<Person>;
  projectAuthors: Array<Person>;
  projectSupervisors: Array<Person>;
};

const Authors = (props: Props) => {
  const [
    suggestions,
    onSuggestionsFetchRequested,
    onSuggestionsClearRequested,
  ] = useSuggestion(
    props.organizationAuthors,
    (a, value) =>
      a.fullName.toLowerCase().slice(0, value.length) == value.toLowerCase()
  );
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <div className="font-size-12 font-size-16-md font-weight-lighter">
        {props.projectAuthors.map((a, idx) => (
          <div key={idx}>
            <FontAwesomeIcon icon={faMinusCircle} color="red" /> {a.fullName}
          </div>
        ))}
      </div>
      <div className="font-size-16 font-size-18-md mt-md-3 font-weight-600">
        Agregar autores
      </div>
      <div style={{ height: "52px" }}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          renderSuggestion={(e) => <div>{e.fullName}</div>}
          inputProps={{
            placeholder:
              "Ingresa al menos 3 letras para buscar los usuarios de esta organización",
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
