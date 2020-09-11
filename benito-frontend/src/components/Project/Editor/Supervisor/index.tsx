import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Project, Person, Organization } from "../../../../types";
import SlideUp from "../../../Common/SlideUp";
import { AxiosRequestConfig } from "axios";
import { benitoHost } from "../../../../config";
import axios from "axios";
import Loader from "../../../Common/Loader";
import Users from "./Users";
import Separator from "../../../Common/Separator";
import UserChanges from "./UserChanges";
import {
  addAuthorToAdd,
  addAuthorToDelete,
  addSupervisorToAdd,
  addSupervisorToDelete,
  removeAuthorToAdd,
  removeAuthorToDelete,
  removeSupervisorToAdd,
  removeSupervisorToDelete,
} from "../../../../actions/project";
import { RootState } from "../../../../reducers";
import { connect } from "react-redux";

type Props = {
  project: Project;
  authorsToAdd: Array<Person>;
  authorsToDelete: Array<Person>;
  supervisorsToAdd: Array<Person>;
  supervisorsToDelete: Array<Person>;
};

const SupervisorEdit = (props: Props) => {
  const [
    { supervisors: organizationSupervisors, authors: organizationAuthors },
    setOrganizationUsers,
  ] = useState<{
    supervisors: Array<Person>;
    authors: Array<Person>;
  }>({ supervisors: [], authors: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let config: AxiosRequestConfig = {
      url: `${benitoHost}/benito/organizations/${props.project.organization.id}?cached=false`,
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
      <div className="center h-100">
        <Loader />
      </div>
    );
  }

  return (
    <SlideUp className="pt-5 pb-5">
      <div className="container bg-white p-3 p-md-5">
        <div className="row">
          <div className="col-6 mt-3">
            <div className="font-size-18 font-size-24-md font-weight-bolder">
              Título
            </div>
            <div className="font-size-14 font-size-18-md font-weight-lighter">
              {props.project.title}
            </div>
          </div>
          <div className="col-6 mt-3">
            <div className="font-size-18 font-size-24-md font-weight-bolder">
              Alias
            </div>
            <div className="font-size-14 font-size-18-md font-weight-lighter">
              TODO
            </div>
          </div>
          <div className="col-12 mt-3">
            <div className="font-size-18 font-size-24-md font-weight-bolder">
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
            />
          </div>
          <div className="col-12 mt-md-3">
            <div className="font-size-18 font-size-24-md font-weight-bolder">
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
            />
          </div>
          <div className="col-12 mt-md-3">
            <Separator
              display="d-block"
              marginLeft={3}
              marginRight={3}
              color="primary"
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
                >
                  Guardar cambios
                </button>
                <button
                  type="button"
                  className="btn btn-danger font-weight-bold"
                >
                  Descartar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideUp>
  );
};

const mapStateToProps = (rootState: RootState) => {
  return {
    authorsToAdd: rootState.project.authorsToAdd,
    authorsToDelete: rootState.project.authorsToDelete,
    supervisorsToAdd: rootState.project.supervisorsToAdd,
    supervisorsToDelete: rootState.project.supervisorsToDelete,
  };
};

export default hot(module)(connect(mapStateToProps)(SupervisorEdit));
