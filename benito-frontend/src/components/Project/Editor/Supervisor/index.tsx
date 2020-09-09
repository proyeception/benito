import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Project, Person } from "../../../../types";
import SlideUp from "../../../Common/SlideUp";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AxiosRequestConfig } from "axios";
import { benitoHost } from "../../../../config";

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
  const [projectAuthors, setProjectAuthors] = useState(props.project.authors);

  useEffect(() => {
    let config: AxiosRequestConfig = {
      url: `${benitoHost}/benito/organizations/${props.project.organization.id}`,
    };
  }, []);

  return (
    <SlideUp className="pt-5 pb-5">
      <div className="container bg-white p-3 p-md-5">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="font-weight-18 font-weight-24-md font-weight-bolder">
              Título
            </div>
            <div className="font-weight-14 font-weight-18-md font-weight-lighter">
              {props.project.title}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="font-weight-18 font-weight-24-md font-weight-bolder">
              Alias
            </div>
            <div className="font-weight-14 font-weight-18-md font-weight-lighter">
              TODO
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="font-weight-18 font-weight-24-md font-weight-bolder">
              Autores
            </div>
            <div className="font-weight-14 font-weight-18-md font-weight-lighter">
              {projectAuthors.map((a, idx) => (
                <div
                  key={idx}
                  onClick={() =>
                    setProjectAuthors(projectAuthors.filter((a2) => a2 != a))
                  }
                >
                  <FontAwesomeIcon icon={faMinusCircle} color="red" />{" "}
                  {a.fullName}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideUp>
  );
};

export default hot(module)(SupervisorEdit);
