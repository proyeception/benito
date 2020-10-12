import React, { useState } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Person } from "../../../types";
import Autosuggest from "react-autosuggest";
import useSuggestion from "../../../hooks/useSuggestion";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ProjectAction } from "../../../store/project/types";
import store from "../../../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core";
import styles from "../../../assets/jss/material-kit-react/views/createProject";

interface Props extends RouteComponentProps {
  organizationUsers: Array<Person>;
  projectUsers: Array<Person>;
  collection: "autores" | "supervisores";
  projectId: String;
  userType: "authors" | "supervisors";
  addDispatch: (u: Person) => ProjectAction;
  deleteDispatch: (u: Person) => ProjectAction;
  usersToAdd: Array<Person>;
  usersToDelete: Array<Person>;
}

const useStyles = makeStyles(styles);

export const Users = (props: Props) => {
  const classes = useStyles();
  
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
          <div
            key={idx}
            className={"mt-1 mb-1 underline-hover cursor-pointer " +  classes.supervisorsAuthors}
            onClick={() => store.dispatch(props.deleteDispatch(u))}
          >
              
            <FontAwesomeIcon
              icon={faMinusCircle}
              color="red"
              className="mr-2"
            />{" "}
            {u.fullName}
          </div>
        ))}
      </div>
      <div className={"font-size-16 font-size-18-md mt-3 " +  classes.supervisorsAuthors}>
        Agregar {props.collection} 
      </div>
      <div className="mt-2 mb-3">
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
          renderSuggestion={(u) => (
            <div
              className="d-flex align-items-center"
              onClick={() => store.dispatch(props.addDispatch(u))}
            >
              <img
                src={u.profilePicUrl?.valueOf()}
                className={classes.suggestionImage}
              />
              <span className="pl-3">{u.fullName}</span>
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