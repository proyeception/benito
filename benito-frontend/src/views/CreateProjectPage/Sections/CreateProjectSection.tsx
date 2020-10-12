import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";

import styles from "../../../assets/jss/material-kit-react/views/createProject";
import { Project, Person, Organization } from "../../../types";
import CustomInput from "../../../components/CustomInput/CustomInput";
import { UserChanges } from "./UserChanges";
import { Users } from "./Users";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { removeSupervisorToAdd, removeSupervisorToDelete, closeProjectEdition } from "../../../actions/project";
import { setProjectUsers } from "../../../functions/project";
import store from "../../../store";
import { benitoHost } from "../../../config";
import Spinner from "../../../components/Spinner/Spinner";
import { AxiosRequestConfig } from "axios";
import axios from "axios";
import {
  addAuthorToAdd,
  addAuthorToDelete,
  addSupervisorToAdd,
  addSupervisorToDelete,
  removeAuthorToAdd,
  removeAuthorToDelete,
} from "../../../actions/project";
import { RootState } from "../../../reducers";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";

const useStyles = makeStyles(styles);

interface Props extends RouteComponentProps {
  project: Project;
  authorsToAdd: Array<Person>;
  authorsToDelete: Array<Person>;
  supervisorsToAdd: Array<Person>;
  supervisorsToDelete: Array<Person>;
}

function CreateProjectSection(props: Props) {
  const classes = useStyles();

  const [
    { supervisors: organizationSupervisors, authors: organizationAuthors },
    setOrganizationUsers,
  ] = useState<{
    supervisors: Array<Person>;
    authors: Array<Person>;
  }>({ supervisors: [], authors: []});

  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  console.log(props.project)

  useEffect(() => {
    {/*url: `${benitoHost}/benito/organizations/${props.project.organization.id}?cached=false`,*/}
    let config: AxiosRequestConfig = {
      url: `${benitoHost}/benito/organizations/5f38423e233da600178b0ba9?cached=false`,      
      method: "GET",
    };

    axios
      .request<Organization>(config)
      .then((res) => res.data)
      .then(setOrganizationUsers)
      .then(() => setIsLoading(false))
      .catch((e) => console.error(e));
  }, []);

  if (isLoading) {
    return (
        <Spinner />
    );
  }

  return (
    <div className={classes.section}>
      <GridContainer justify="left">
        <GridItem xs={12} sm={12} md={12} lg={12}>
            <CustomInput
                labelText="Título"
                id="title"
                formControlProps={{
                  fullWidth: true
                }}
            />
            <CustomInput
                labelText="Sumario"
                id="summary"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                    multiline: true,
                    rowsMax: 4,
                    rows: 4,
                    variant: "outlined"
                }}
            />
        
        <div className="col-12 mt-3">
            <div className={"font-size-18 font-size-24-md font-weight-bolder " + classes.supervisorsAuthors}>
              Autores
            </div>
            <Users
              organizationUsers={organizationAuthors}
              projectUsers={props.project.authors}
              collection="autores"
              projectId={props.project.id}
              userType="authors"
              usersToAdd={props.authorsToAdd}
              usersToDelete={props.authorsToDelete}
              addDispatch={addAuthorToAdd}
              deleteDispatch={addAuthorToDelete}
              {...props}
            />
          </div>
          <div className="col-12 mt-md-3">
            <div className={"font-size-18 font-size-24-md font-weight-bolder "  + classes.supervisorsAuthors}>
              Supervisores
            </div>
            <Users
              organizationUsers={organizationSupervisors}
              projectUsers={props.project.supervisors}
              collection="supervisores"
              projectId={props.project.id}
              userType="supervisors"
              usersToAdd={props.supervisorsToAdd}
              usersToDelete={props.supervisorsToDelete}
              addDispatch={addSupervisorToAdd}
              deleteDispatch={addSupervisorToDelete}
              {...props}
            />
          </div>

                  
        <div className="col-12 col-md-6 mt-md-3">
            <UserChanges
              name="autores"
              toAdd={props.authorsToAdd}
              toDelete={props.authorsToDelete}
              removeAddedDispatch={removeAuthorToAdd}
              removeDeletedDispatch={removeAuthorToDelete}
            />
          </div>
          <div className="col-12 col-md-6 mt-md-3">
            <UserChanges
              name="supervisores"
              toAdd={props.supervisorsToAdd}
              toDelete={props.supervisorsToDelete}
              removeAddedDispatch={removeSupervisorToAdd}
              removeDeletedDispatch={removeSupervisorToDelete}
            />
          </div>

          <div className="col-12">
            <div className="font-size-18 font-size-24-md font-weight-bolder mt-5">
              <div className="d-flex justify-content-around">
                <button
                  type="button"
                  className="btn btn-success font-weight-bold"
                  disabled={isUploading}
                  onClick={() => {
                    setIsUploading(true);
                    setProjectUsers(
                      props.project.authors
                        .filter(
                          (a) =>
                            !props.authorsToDelete.some((atd) => atd.id == a.id)
                        )
                        .concat(props.authorsToAdd),
                      props.project.supervisors
                        .filter(
                          (s) =>
                            !props.supervisorsToDelete.some(
                              (std) => std.id == s.id
                            )
                        )
                        .concat(props.supervisorsToAdd),
                      props.project.id
                    )
                      .then(console.log)
                      .then(() => store.dispatch(closeProjectEdition()))
                      .then(() =>
                        props.history.push(`/projects/${props.project.id}`)
                      )
                      .catch(console.error);
                  }}
                >
                  {isUploading ? (
                    <div className="spinner-border text-light" role="status">
                      <span className="sr-only">Loading ...</span>
                    </div>
                  ) : (
                    <div>
                      <span>Guardar cambios</span>
                    </div>
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-danger font-weight-bold"
                  onClick={() => {
                    store.dispatch(closeProjectEdition());
                    props.history.push(`/projects/${props.project.id}`);
                  }}
                >
                  Descartar
                </button>
              </div>
            </div>
          </div>
        </GridItem>
      </GridContainer>
    </div>
  );
}

const mapStateToProps = (rootState: RootState) => {
  return {
    authorsToAdd: rootState.project.authorsToAdd,
    authorsToDelete: rootState.project.authorsToDelete,
    supervisorsToAdd: rootState.project.supervisorsToAdd,
    supervisorsToDelete: rootState.project.supervisorsToDelete,
  };
};

export default hot(module)(
  withRouter(connect(mapStateToProps)(CreateProjectSection))
);