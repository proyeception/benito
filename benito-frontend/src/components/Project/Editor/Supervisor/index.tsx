import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Project, Person, Organization } from "../../../../types";
import SlideUp from "../../../Common/SlideUp";
import { AxiosRequestConfig } from "axios";
import { benitoHost } from "../../../../config";
import axios from "axios";
import Loader from "../../../Common/Loader";
import Authors from "./Authors";

type Props = {
  project: Project;
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
      url: `${benitoHost}/benito/organizations/${props.project.organization.id}`,
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
          <div className="col-12 col-md-6">
            <div className="font-size-18 font-size-24-md font-weight-bolder">
              Título
            </div>
            <div className="font-size-14 font-size-18-md font-weight-lighter">
              {props.project.title}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="font-size-18 font-size-24-md font-weight-bolder">
              Alias
            </div>
            <div className="font-size-14 font-size-18-md font-weight-lighter">
              TODO
            </div>
          </div>
          <div className="col-12 mt-md-3">
            <div className="font-size-18 font-size-24-md font-weight-bolder">
              Autores
            </div>
            <Authors
              organizationAuthors={organizationAuthors}
              organizationSupervisors={organizationSupervisors}
              projectAuthors={props.project.authors}
              projectSupervisors={[]}
            />
          </div>
        </div>
      </div>
    </SlideUp>
  );
};

export default hot(module)(SupervisorEdit);
