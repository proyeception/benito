import React, { useState } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Person } from "../../../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import Autosuggest from "react-autosuggest";
import useSuggestion from "../../../../hooks/useSuggestion";
import { addUsersToProject } from "../../../../functions/project";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface Props extends RouteComponentProps {
  organizationUsers: Array<Person>;
  projectUsers: Array<Person>;
  collection: "autores" | "supervisores";
  projectId: String;
  userType: "authors" | "supervisors";
}

const Users = (props: Props) => {
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
  const [usersToAdd, setUsersToAdd] = useState<Array<Person>>([]);

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
      <div className="mt-2 mb-3 qui-project-supervisor-editor-autosuggest">
        <Autosuggest
          suggestions={suggestions.filter(
            (ou) =>
              !props.projectUsers.some((pu) => pu.id == ou.id) ||
              usersToAdd.some((uta) => uta.id == ou.id)
          )}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          renderSuggestion={(e) => (
            <div
              className="d-flex align-items-center"
              onClick={() => setUsersToAdd(usersToAdd.concat(e))}
            >
              <img
                src={e.profilePicUrl?.valueOf()}
                className="suggestion-image"
              />
              <span className="pl-3">{e.fullName}</span>
            </div>
          )}
          inputProps={{
            placeholder: `Ingresa para buscar los ${props.collection} de esta organización`,
            value: inputValue,
            onChange: (_, { newValue }) => setInputValue(newValue),
          }}
          getSuggestionValue={(s) => s.fullName.valueOf()}
        />
      </div>
      <div className={usersToAdd.length == 0 ? "d-none" : "d-block"}>
        {usersToAdd.map((a, idx) => (
          <div key={idx} className="mt-1 mb-1">
            <FontAwesomeIcon
              icon={faMinusCircle}
              color="red"
              className="mr-2"
            />{" "}
            {a.fullName}
          </div>
        ))}
        <button
          className="btn btn-primary font-weight-bold  mt-3"
          onClick={() =>
            addUsersToProject(usersToAdd, props.projectId, props.userType)
              .then(console.log)
              .then(() => props.history.go(0))
              .catch(console.error)
          }
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

export default hot(module)(withRouter(Users));
