import React, { useState } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Person } from "../../../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import Autosuggest from "react-autosuggest";
import useSuggestion from "../../../../hooks/useSuggestion";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Action, ActionType } from ".";

interface Props extends RouteComponentProps {
  organizationUsers: Array<Person>;
  projectUsers: Array<Person>;
  collection: "autores" | "supervisores";
  projectId: String;
  userType: "authors" | "supervisors";
  addDispatch: ActionType;
  deleteDispatch: ActionType;
  dispatch: React.Dispatch<Action>;
  usersToAdd: Array<Person>;
  usersToDelete: Array<Person>;
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

  return (
    <div className="mt-1 mt-md-3">
      <div className="font-size-14 font-size-16-md font-weight-lighter">
        {props.projectUsers.map((u, idx) => (
          <div key={idx} className="mt-1 mb-1 underline-hover cursor-pointer">
            <FontAwesomeIcon
              icon={faMinusCircle}
              color="red"
              className="mr-2"
              onClick={() =>
                props.dispatch({ type: props.deleteDispatch, payload: u })
              }
            />{" "}
            {u.fullName}
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
              props.usersToAdd.some((uta) => uta.id == ou.id) ||
              props.usersToDelete.some((utd) => utd.id == ou.id)
          )}
          focusInputOnSuggestionClick={true}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          renderSuggestion={(e) => (
            <div
              className="d-flex align-items-center"
              onClick={() =>
                props.dispatch({ type: props.addDispatch, payload: e })
              }
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
    </div>
  );
};

export default hot(module)(withRouter(Users));
