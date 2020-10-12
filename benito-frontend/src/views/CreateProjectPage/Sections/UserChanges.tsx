import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Person } from "../../../types";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProjectAction } from "../../../store/project/types";
import store from "../../../store";
import { makeStyles } from "@material-ui/core";
import styles from "../../../assets/jss/material-kit-react/views/createProject";


const useStyles = makeStyles(styles);

type Props = {
  name: String;
  toAdd: Array<Person>;
  toDelete: Array<Person>;
  removeAddedDispatch: (u: Person) => ProjectAction;
  removeDeletedDispatch: (u: Person) => ProjectAction;
};


export const UserChanges = (props: Props) => {
    
    const classes = useStyles();

    return (<div className="container">
    <div className="row">
      <div className="col-12">
        <div className={"font-size-18 font-size-24-md font-weight-bolder text-capitalize text-center " +  classes.supervisorsAuthors}>
          {props.name}
        </div>
      </div>
      <div className="col-6 mt-3">
        <div className={"font-size-14 font-size-18-md font-weight-lighter justify-content-center " +  classes.supervisorsAuthors}>
          {props.toAdd.map((u, idx) => (
            <div
              onClick={() => store.dispatch(props.removeAddedDispatch(u))}
              key={idx}
              className="underline-hover cursor-pointer"
            >
                <FontAwesomeIcon icon={faPlusCircle} color="green" /> 
                {u.fullName}                    
            </div>
          ))}
        </div>
      </div>
      <div className="col-6 mt-3">
        <div className={"font-size-14 font-size-18-md font-weight-lighter " +  classes.supervisorsAuthors}>
          {props.toDelete.map((u, idx) => (
            <div
              onClick={() => store.dispatch(props.removeDeletedDispatch(u))}
              key={idx}
              className="underline-hover cursor-pointer"
            >
              <FontAwesomeIcon icon={faMinusCircle} color="red" /> 
              {u.fullName} 
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>);
}

export default hot(module)(UserChanges);